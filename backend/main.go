package main

import (
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var jwtSecret []byte

func init() {
	err := godotenv.Load()
	if err != nil {
		panic("Unable to load env file")
	}
	jwtSecret = []byte(os.Getenv("SECRET"))
}

func main() {
	r := gin.Default()

	r.POST("/login", loginHandler)

	auth := r.Group("/")
	auth.Use(AuthMiddleware())
	{
		auth.GET("/containers", getContainers)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Authorization header is missing"})
			c.Abort()
			return
		}
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token"})
			c.Abort()
			return
		}

		c.Next()
	}
}

func loginHandler(c *gin.Context) {
	var creds struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
		return
	}

	if creds.Username != os.Getenv("USERNAME") || creds.Password != os.Getenv("PASSWORD") {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": creds.Username,
		"role":     "admin",
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "token": tokenString})
}

func executeCommand(command string) (string, error) {
	cmd := exec.Command("sh", "-c", command)
	output, err := cmd.CombinedOutput()
	return string(output), err
}

func getContainers(c *gin.Context) {
	output, err := executeCommand("docker ps -a --format \"{{.ID}} {{.Image}} {{.Names}} {{.Status}}\"")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
		return
	}

	lines := strings.Split(strings.TrimSpace(output), "\n")
	var containers []gin.H

	for _, line := range lines {
		parts := strings.Fields(line)
		id := parts[0]
		name := parts[2]
		status := strings.Join(parts[3:], " ")

		imageOutput, err := executeCommand(fmt.Sprintf("docker inspect %s --format \"{{.Config.Image}}\"", id))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": err.Error()})
			return
		}

		imageParts := strings.Split(strings.TrimSpace(imageOutput), ":")
		imageName := imageParts[0]
		version := "latest"
		if len(imageParts) > 1 {
			version = imageParts[1]
		}

		container := gin.H{
			"id":      id,
			"image":   imageName,
			"version": version,
			"name":    name,
			"status":  status,
		}

		containers = append(containers, container)
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "containers": containers})
}
