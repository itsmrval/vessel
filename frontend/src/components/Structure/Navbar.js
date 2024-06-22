import React from 'react';

const Navbar = () => {
    return (
            <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
                <div className="sidenav-header">
                    <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                    <a className="navbar-brand m-0" href="/">
                        <img src="./assets/img/logo.png" className="navbar-brand-img h-100" alt="main_logo" />
                        <span className="ms-1 font-weight-bold">Vessel</span>
                    </a>
                </div>
                <hr className="horizontal dark mt-0" />
                <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fa fa-home text-primary text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/containers">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fa fa-list text-warning text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text ms-1">Containers</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/images">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fa fa-images text-danger text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text ms-1">Images</span>
                            </a>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <a className="nav-link " href="/network">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fa fa-network-wired text-info text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text ms-1">Network</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="/mounts">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fa fa-hdd text-success text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text ms-1">Storage mounts</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="sidenav-footer mx-3 ">
                    <div className="card card-plain shadow-none" id="sidenavCard">
                        <img className="w-50 mx-auto" src="./assets/img/icon-documentation.svg" alt="sidebar_illustration" />
                        <div className="card-body text-center p-2 w-100 pt-0">
                            <div className="docs-info">
                                <h6 className="mb-0">Suggestions?</h6>
                                <p className="text-xs font-weight-bold mb-0">This project is open source, can contribute below</p>
                            </div>
                        </div>
                    </div>
                    <a href="" target="_blank" className="btn btn-dark btn-sm w-100 mb-2"><i className="fa fa-github"></i> GitHub</a>
                    <a className="btn btn-primary btn-sm mb-0 w-100" href="">Disconnect</a>
                </div>
            </aside>
    );
}

export default Navbar;