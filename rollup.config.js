import typescript from '@rollup/plugin-typescript';
import polyfill from 'rollup-plugin-polyfill';
import resolve from "rollup-plugin-node-resolve";
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';
import {onDev, files} from './.build/Rollup';

export default [
    {
        input: [
            ... files("src/ts"),
            ... files("src/ts/pages")
        ],
        output: {
            dir: "public/js",
            format: "system",
            sourcemap: onDev()
        },
        plugins: [
            clear({
                targets: ['public/js'],
                watch: true
            }),
            typescript({
                tsconfig: "./tsconfig.json"
            }),
            !onDev() &&  terser({
                format: {
                    comments: false
                }
            }) 
        ]
    }
    ,
    {
        input: "node_modules/systemjs/dist/system.js",
        output: {
            dir: "public/lib"
        },
        plugins: [
            resolve(),
            polyfill([
                'promise-polyfill/src/polyfill'
            ]),
            terser({
                format: {
                    comments: false
                }
            }) 
        ]
    }
]
