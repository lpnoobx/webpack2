
const path = require('path');
//para que reconozaca html
const htmlWebpackPlugin =require('html-webpack-plugin');
//para que reconozco css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin =require('css-minimizer-webpack-plugin');
const TerserPlugin =require('terser-webpack-plugin');
const Doenv =require('dotenv-webpack');
const {CleanWebpackPlugin} =  require('clean-webpack-plugin');
module.exports = {
    //punto de entrada de la aplicacion
    entry :'./src/index.js',
    output :{
        //para saber donde se encuentra mi proyecto
        path :path.resolve(__dirname,'dist'),

        filename :'[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'


    },
    resolve :{

        extensions:['.js'],
        alias : {
            '@utils' : path.resolve(__dirname, 'src/utils/'),
            '@templates' : path.resolve(__dirname, 'src/templates/'),
            '@styles' : path.resolve(__dirname, 'src/styles/'),
            '@images' : path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module : {
        rules :[
            {
            //expresion regular : cualquier archivo que empiece con m y tenga extension js  
            test : /\.m?js$/ ,
            exclude :/node_modules/,
            use :{ 
                loader : 'babel-loader'
             }
            },
            {
                //test : /\.css|.styl$/i ,
                test : /\.css|\.styl$/i ,
                use : [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ],
            },
            {
                test : /\.png/,
                type : 'asset/resource'
            },
            {
                test : /\.(woff|woff2)$/,
                use :{
                    loader :'url-loader',
                    options:{
                        limit :10000,
                        mimetype : "application/font.woff",
                        name: "[name].[contenthash].[ext] ",
                        outputPath :"./assets/fonts/",
                        publicPath : "../assets/fonts/",
                        esModule : false,
                    },
                }
            }
        ]

     },

     plugins : [
      new  htmlWebpackPlugin({
          injesct :true,
          template : './public/index.html',
          filename : './index.html'
      }),
      new MiniCssExtractPlugin({
          filename :'assets/[name].[contenthash].css'
      }),
      new CopyPlugin({
          patterns :[
              {
                  from : path.resolve(__dirname,"src","assets/images"),
                  to : "assets/images"
              }
          ]
      }),
      new Doenv(),
      new CleanWebpackPlugin(),



      
     ],
     optimization :{
        minimize : true ,
        minimizer :[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }

}