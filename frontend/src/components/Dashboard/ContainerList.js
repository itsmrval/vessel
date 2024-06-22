import React from 'react';
import api from '../../api/api';

const ContainerList = ({ containers, fetchContainers }) => {
  const handleAction = async (id, action) => {
    try {
      await api.post(`/containers/${id}/${action}`);
      fetchContainers();
    } catch (error) {
      console.error(`Error ${action} container`, error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/containers/${id}`);
      fetchContainers();
    } catch (error) {
      console.error('Error deleting container', error);
    }
  };

  return (
        <div class="col-lg-7 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-header pb-0 p-3">
            <div class="d-flex justify-content-between">
              <h6 class="mb-2">Summary</h6>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table align-items-center">
              <tbody>
                {containers.map(container => (
                  <tr key={container.id}>
                    <td class="w-30">
                      <div class="d-flex px-2 py-1 align-items-center">
                        <div class="ms-4">
                          <p class="text-xs font-weight-bold mb-0">Name:</p>
                          <h6 class="text-sm mb-0">{container.name}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p class="text-xs font-weight-bold mb-0">Image:</p>
                        <h6 class="text-sm mb-0">{container.image}:{container.version}</h6>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p class="text-xs font-weight-bold mb-0">State:</p>
                        <h6 class="text-sm mb-0">{container.status}</h6>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p class="text-xs font-weight-bold mb-0">Actions:</p>
                        <a class="text-primary"><i class="fa fa-cog"></i></a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
    );
};

export default ContainerList;
