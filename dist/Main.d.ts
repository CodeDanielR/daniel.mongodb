/// <reference types="node" />
import Mongoose from "mongoose";
import EventEmmiter from "events";
import ConstructorProps from "./Interfaces/ConstructorProps";
declare class DanielMongoDB extends EventEmmiter {
    name: string;
    url: string;
    private mongoConfig;
    private firstConnect;
    private connected;
    model: Mongoose.Model<any>;
    schema: Mongoose.Schema;
    db: Mongoose.Connection;
    constructor(options: ConstructorProps);
    connect(): Mongoose.Connection;
    disconnect(): Promise<void>;
    get connection(): Mongoose.Connection;
    set(key: string, data: any): Promise<any>;
    get(key: string): Promise<any>;
    remove(key: string): Promise<any>;
    delete(key: string): Promise<any>;
    getAll(): Promise<any[]>;
    deleteAll(): Promise<any[]>;
    has(key: string): Promise<boolean>;
    add(key: string, data: any): Promise<any>;
    subtract(key: string, data: number): Promise<any>;
    pull(key: string, data: any): Promise<any>;
    push(key: string, data: any): Promise<any>;
    includes(key: string, data: any): Promise<any>;
    get mongoModel(): Mongoose.Model<any, {}, {}, {}>;
    _eventHandling(): void;
}
export default DanielMongoDB;
