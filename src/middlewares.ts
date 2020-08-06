export default [
    {path: "*", controller: "indexController", type: ['get'], exception: ['login', 'test']},
    {path: "/test/*", controller: "indexController", type: ['get'], exception: ['exception']}
    //{path: "/base/*", controller: "indexController", type: ['get']},
    //{path: "/test/*", controller: "indexController", type: ['get']},
    //il est aussi possible de mettre * en route ou une route fixe
]