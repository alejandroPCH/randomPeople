

    //dependencias de desarrollador que siempre tienes que instalar
    //          ojo que esto es solo para JS

    /*
    babel-loader nos permite usar babel con webpack
    @babel/core es babel en general
    @babel/preset-env trae y te permite usar las ultimas características de JavaScript
    @babel/plugin-transform-runtime te permite trabajar con todo el tema de asincronismo como ser async y await
    Debes crear el archivo de configuración de babel el cual tiene como nombre .babelrc

    */


    const path=require('path')
    const HtmlWebpackPlugin=require('html-webpack-plugin')
    const MiniCssExtractPlugin=require('mini-css-extract-plugin')
    const CopyPlugin=require('copy-webpack-plugin')
    const DotEnv= require('dotenv-webpack')


    module.exports={
        //entry= el punto de entrada
        entry:'./src/index.js',
        
        // quiero que configures todo específicamente para el modo desarrollador, así tserá más rápido ver si hay errores
        mode: 'development',
        watch:true,

        plugins:[

            new HtmlWebpackPlugin({
        //inject:body insertará el <script></script> al final del body
                //al solo poner true lo inyectarías al final del head
                inject:'body', // ||'head' || true || false -> desactivará todas las inyecciones automáticas
                template:'./public/index.html',
                filename:'./index.html'
        
            }),
        
            // //parece que solo poniendo esto se inicializa 
            new MiniCssExtractPlugin({
                filename:'assets/[name].[contenthash].css'
            }),
            
            new CopyPlugin({


                patterns:[
                    {
                        from:path.resolve(__dirname,'src','assets/images'),//carpeta a mover (o copiar)al dist
                        //tambien puedes mover un solo archivo, solo que en esta caso es mejor mover toda una carpeta
                        to:'assets/images'// <- ruta final del dist 
                    }
                ]

            }),

            new DotEnv(),
        
        ],

            output: {

            // path.resolve sirve para que cuando envies tu proyecto a la nube, no tengas 
            // problemas de en donde están tus archivos, el servidor cojerá este path que 
            // path que estás usando (las ubicaciones de los archivos que ya conoces )...
            // así tambien funciona con los nombres

            //en resumen... está usando tu directorio
            path:path.resolve(__dirname, './dist'),

            //por defecto ya es main
            filename:'[name].[contenthash].js',
            
            //hacia donde quieres mover tus assets de fuentes?
            assetModuleFilename:'assets/images/[hash][ext][query]'// el hash son caracteres aleatorios 
        }, 
        
    resolve:{
        // si trabajas con react, typescript, u otras extenciones... específicar este paso
        // es muy importante
        extensions:['.js'],
        alias:{
            '@utils':path.resolve(__dirname,'src/utils'),
            '@templates':path.resolve(__dirname,'src/templates'),
            '@styles':path.resolve(__dirname,'src/styles'),
            '@images':path.resolve(__dirname,'src/assets/images'),

        }

    },

    module:{
        
        //si... aquí estableces las reglas del proyecto... son configuraciones
        rules:[
        
            {
            //utiliza cualquier extencion que sea m__.js o js
            test:/\.m?js$/,
            //con m o sin m, pero sin con la extención js

            exclude: /node_modules/,

            use:{//usarás babel-loader
                loader:'babel-loader'
            }
        },

           {

            test: /\.s?css$/,
            use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader']
          },

          {
              //creo que no es necesario usar copy-webpack si lo haces de esta forma
                // (esto es lo que permite que peudas usar variables en el archivo template.js)
              test:/\.png/,// <- para aceptar imagenes png's
              type:'asset/resource'
          },

          {

            test:/\.(woff|woff2)$/, // <- para aceptar formatos woff
            use:{
                
                loader:'url-loader', //<- nombre del loader... el que decargaste
                options:{
                    //habilita o desabilita la transformacion de archivos en base64....
                    limit:10000, //tambien pueden ser pasados booleanos ->true/false
                     
                    //aquí especificas el tipo de MIME (Multipurpose Internet Mail Extensions)
                    //MIME es el formato estandar de mandar contenido en la red
                    MimeType:"application/font-wolff",

                    //Nombre inicial + su extención
                    name:'[name].[contenthash].[ext]',  // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria

                    //Directorio de salida
                    outputPath:'./assets/fonts',

                    //directorio público
                    publicPath:'../assets/fonts',

                    //es modulo?, en esta caso no
                    esModule:false,
                },
            }

          },


        ]
    },

    
    }