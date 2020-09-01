const webpack = require('webpack')

const modoDev = process.env.NODE_ENV !== 'production'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Optimiza = require('optimize-css-assets-webpack-plugin')

module.exports = {
    //Nesse momento estamos apenas no ambiente de teste, de desenvolvimento
    //mode: 'development',

    mode: modoDev ? 'development' : 'production',

    /* Mudando para "production" ja esta em fase de Produção, fase final,
    gerando um codigo mimnificado (de uma linha apenas)
    mode: 'production', */

    //Arquivo de entrada, o ponto de entrada
    entry: './src/principal.js',

    output:{

        //Define o nome do arquivo a ser gerado no caso "principal.js"
        filename: 'principal.js',

        //Pasta destino
        path: __dirname + '/public'
    },

    devServer:{
        contentBase: "./public",
        port: 9000
    },

    optimization:{
        minimizer:[
            new uglifyJsPlugin({
                cache: true,
                parallel: true
            }),
        new Optimiza({})
        ]
    },

    plugins: [
        new MiniCssExtractPlugin ({
            filename: "estilo.css",
        })
    ],

    module:{
        rules: [
            {
                test:/\.s?[ac]ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    //'style-loader',  
                    'css-loader',
                    'sass-loader'   
                ]
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
      ]
    }
}