/**
 * Created by Ovídio César on 09/12/17.
 */
import {Server} from "./server";
import * as minimist from "minimist";

// Getting environment argument
const args = minimist(process.argv.slice(2), {
    default: {
        e: 'dev' //Environment
    }
});

// Starting server
new Server(args.e);
