const httpMocks = require("node-mocks-http");
const taskController = require("../Controllers/taskController");
const Task = require("../models/task");
const replaceEncodedChars = require("../config/replaceEncodedChars");

jest.mock("../models/task");
jest.mock("../config/replaceEncodedChars");

describe("Task Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllTasks", () => {
        it("should return all tasks with decoded characters", async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const taskData = [
                { title: "Task1", description: "Desc1" },
                { title: "Task2", description: null }
            ];
            Task.find.mockReturnValue({
                sort: jest.fn().mockResolvedValue(taskData)
            });
            replaceEncodedChars.mockImplementation((str) => `decoded-${str}`);

            await taskController.getAllTasks(req, res);

            const data = res._getJSONData();
            expect(data.allTasks[0].title).toBe("decoded-Task1");
            expect(res.statusCode).toBe(200);
        });

        it("should handle database error", async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            Task.find.mockReturnValue({
                sort: jest.fn().mockRejectedValue(new Error("DB Error"))
            });

            await taskController.getAllTasks(req, res);

            expect(res.statusCode).toBe(500);
        });
    });

    describe("getTask", () => {
        it("should return a specific task", async () => {
            const req = httpMocks.createRequest({ query: { taskId: "123" } });
            const res = httpMocks.createResponse();
            Task.find.mockResolvedValue([{ title: "Task1", description: null }]);
            replaceEncodedChars.mockImplementation((str) => str);

            await taskController.getTask(req, res);

            const data = res._getJSONData();
            expect(data.task[0].title).toBe("Task1");
        });

        it("should handle task not found", async () => {
            const req = httpMocks.createRequest({ query: { taskId: "123" } });
            const res = httpMocks.createResponse();
            Task.find.mockResolvedValue(null);

            await taskController.getTask(req, res);

            expect(res.statusCode).toBe(404);
        });
    });

    describe("createTask", () => {
        it("should create a new task", async () => {
            const req = httpMocks.createRequest({
                body: { title: "New Task", description: "Test", due: "2025-05-01" }
            });
            const res = httpMocks.createResponse();
            Task.find.mockResolvedValue([]);
            Task.prototype.save = jest.fn().mockResolvedValue(req.body);

            await taskController.createTask[3](req, res); 

            const data = res._getJSONData();
            expect(data.savedTask.title).toBe("New Task");
        });
	
        it("should handle new task without description", async () => {
            const req = httpMocks.createRequest({
                body: { title: "New Task", due: "2025-04-29T08:22:35.992Z" }
            });
            const res = httpMocks.createResponse();
            Task.find.mockResolvedValue([]);
            Task.prototype.save = jest.fn().mockResolvedValue(req.body);

            await taskController.createTask[3](req, res); 
            
            const data = res._getJSONData();
            expect(data.savedTask.title).toBe("New Task");
    
        });
    });

    describe("updateStatus", () => {
        it("should update task status", async () => {
            const req = httpMocks.createRequest({
                body: { taskId: "123", status: 2 }
            });
            const res = httpMocks.createResponse();
            Task.findById.mockResolvedValue(true);
            Task.updateOne.mockResolvedValue({ modifiedCount: 1 });

            await taskController.updateStatus[1](req, res);

            expect(res.statusCode).toBe(200);
        });

        it("should handle missing task", async () => {
            const req = httpMocks.createRequest({
                body: { taskId: "123", status: 2 }
            });
            const res = httpMocks.createResponse();
            Task.findById.mockResolvedValue(null);

            await taskController.updateStatus[1](req, res);

            expect(res.statusCode).toBe(500);
        });
    });

    describe("deleteTask", () => {
        it("should delete a task", async () => {
            const req = httpMocks.createRequest({ body: { taskId: "123" } });
            const res = httpMocks.createResponse();
            Task.findById.mockResolvedValue(true);
            Task.findByIdAndDelete.mockResolvedValue(true);

            await taskController.deleteTask(req, res);

            expect(res.statusCode).toBe(200);
        });

        it("should handle task not found", async () => {
            const req = httpMocks.createRequest({ body: { taskId: "123" } });
            const res = httpMocks.createResponse();
            Task.findById.mockResolvedValue(null);

            await taskController.deleteTask(req, res);

            expect(res.statusCode).toBe(500);
        });
    });
});