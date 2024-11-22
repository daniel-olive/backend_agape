import path from 'path';
import {defineConfig} from 'vitest/config';

export default defineConfig({
    test:{
        
    },
    resolve: {
        alias: [
            {
                find: "@modules",
                replacement: path.resolve(__dirname, "src/modules")
            },
            {
                find: "@shared",
                replacement: path.resolve(__dirname, "src/shared")
            },
            {
                find: "@main",
                replacement: path.resolve(__dirname, "src/main"),
            }

        ]
    }
})