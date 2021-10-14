import Mongoose from "mongoose"
import EventEmmiter from "events"
import ConstructorProps from "./Interfaces/ConstructorProps"
import ConstructorConfig from "./Interfaces/ConstructorConfig";

class DanielMongoDB extends EventEmmiter {
    
    private name: string;
    private url: string;
    private mongoConfig: ConstructorConfig;
    private firstConnect: boolean;
    private connected: boolean;
    public model: Mongoose.Model<any>;
    public schema: Mongoose.Schema;
    public db: Mongoose.Connection;

    constructor(options: ConstructorProps) {
        super()
        this.connected = false
        this.firstConnect = true
        this.name = options.name
        this.url = options.url
    }

    connect() {
        if(this.connected) return
        Mongoose.connect(this.url, this.mongoConfig)
        this.db = Mongoose.connection;
        if (this.firstConnect) this._eventHandling()
        this.firstConnect = false
        this.schema = new Mongoose.Schema({
            ID: {},
            data: {}
        })
        this.connected = true
        this.model = Mongoose.model(this.name, this.schema)
        return this.db
    }

    disconnect() {
        if(!this.connected) return
        this.connected = false
        return Mongoose.disconnect()
    }

    get connection() {
        return Mongoose.connection
    }

    async set(key: string, data: any) {
        const obj = await this.model.findOne({ ID: key })
        if (obj) {
            obj.data = data
            return obj.save()
        } else {
            const newObj = new this.model({ ID: key, data: data })
            return newObj.save()
        }
    }

    async get(key: string) {
        const obj = await this.model.findOne({ ID: key })
        return obj ? obj.data : undefined
    }

    async remove(key: string) {
        const obj = await this.model.findOne({ ID: key })
        return obj ? obj.remove() : null
    }

    async delete(key: string) {
        const obj = await this.model.findOne({ ID: key })
        return obj ? obj.remove() : null
    }

    async getAll() {
        const obj = await this.model.find({}).exec()
        return obj ? obj : []
    }
    async deleteAll() {
        const obj = await this.model.find({}).exec()
        return obj ? obj.map(o => o.remove()) : []
    }

    async has(key: string) {
        const obj = await this.model.findOne({ ID: key })
        return obj ? true : false
    }

    async add(key: string, data: any) {
        const obj = await this.model.findOne({ ID: key })
        if (obj) {
            obj.data = obj.data + data
            return obj.save()
        }
        else {
            const newObj = new this.model({ ID: key, data: data })
            return newObj.save()
        }
    }

    async subtract(key: string, data: number) {
        const obj = await this.model.findOne({ ID: key })
        if (obj) {
            obj.data = obj.data - data as number
            return obj.save()
        }
        else {
            const newObj = new this.model({ ID: key, data: data })
            return newObj.save()
        }
    }

    async pull(key: string, data: any) {
        const obj = await this.model.findOne({ ID: key })
        if (obj) {
            obj.data = obj.data.filter((v: any) => v !== data)
            return obj.save()
        }
        else {
            const newObj = new this.model({ ID: key, data: data })
            return newObj.save()
        }
    }

    async push(key: string, data: any) {
        const obj = await this.model.findOne({ ID: key })
        if (obj) {
            obj.data.push(data)
            return obj.save()
        }
        else {
            const newObj = new this.model({ ID: key, data: data })
            return newObj.save()
        }
    }

    async includes(key: string, data: any) {
        const obj = await this.model.findOne({ ID: key })
        if (obj) {
            return obj.data.includes(data)
        }
        else {
            return false
        }
    }

    get mongoModel() {
        return this.model
    }

    _eventHandling() {
        this.db.on('open', () => this.emit('ready'))
        this.db.on('error', e => this.emit('error', e))
        this.db.on('disconnect', () => {
            this.emit('disconnect')
            if (!this.connected) Mongoose.connect(this.url, this.mongoConfig ? this.mongoConfig : { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        })
    }

}

export default DanielMongoDB