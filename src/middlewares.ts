export default [
    {path: "/base/*", controller: "indexController", type: ['get']},
    {path: "/test/*", controller: "indexController", type: ['get']},
    //il est aussi possible de mettre * en route ou une route fixe
]