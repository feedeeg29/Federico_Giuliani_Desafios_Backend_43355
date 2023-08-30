import { connectToDatabase } from "../../db/mongo.db.js";
import { persistence } from '../../utils/dotenv/dotenv.config.js';
import MemoryDAO from '../../Controller/actions.fs.js';
import MongoDAO from '../../Controller/actions.mongo.js';

let daoFactory; // Cambio: No inicialices la variable aquí

switch (persistence) {
    case 'memory':
        daoFactory = MemoryDAO; // Cambio: Asigna la clase directamente
        console.log("memory");
        break;
    case 'mongo':
        await connectToDatabase();
        console.log("mongo");
        daoFactory = MongoDAO; // Cambio: Asigna la clase directamente
        break;
    default:
        throw new Error('Unknown persistence type');
}
console.log(daoFactory);

export { daoFactory }; // Cambio: Exporta la variable



