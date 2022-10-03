export default [
    {path: "/", controller: "indexController", type: "get"},
    {path: "/test", controller: "indexController::test", type: "get"},
    {path: "/session", controller: "sessionController", type: "get"}
]