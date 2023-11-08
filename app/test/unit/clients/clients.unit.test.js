const { clientsController, mockDataClientsArray} = require("./mocks");
const httpMocks = require('node-mocks-http');


describe('Clients API Tests', () => {

  it('should get client list', async () => {
    //mock for testing findAllClients from clientsController
    
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    
    const mockSpyFindAllClients = jest.spyOn(clientsController,'findAllClients');
    
    const mockFuncFindeAllClients = jest.fn(async () => {
      return response.status(200).json(mockDataClientsArray);
    });
    
    mockSpyFindAllClients.mockImplementation(mockFuncFindeAllClients);
    
    
    await clientsController.findAllClients(request, response);
    expect(mockSpyFindAllClients).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
	  expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData().length).toEqual(3);
  });


  it('should create a client', async () => {
  
  //mock for testing addClient from clientsController
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest();
  
  const mockSpyAddClient = jest.spyOn(clientsController,'addClient');
  
  const mockFuncAddClient = jest.fn(async () => {
    return response.status(200).json(mockDataClientsArray[0]);
  });
  
  mockSpyAddClient.mockImplementation(mockFuncAddClient);
  
  await clientsController.addClient(request, response);
  expect(mockSpyAddClient).toHaveBeenCalledTimes(1);
  expect(response.statusCode).toEqual(200);
  expect(response._isEndCalled()).toBeTruthy();
  console.log(response._getJSONData())
  
  expect(response._getJSONData().name).toEqual('teri');
  
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  
});