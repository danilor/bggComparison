import * as mysql from "mysql";
import dbConfig from "../config/db.config";


class DB{

    _errors: Record<string, string>={
        ERR_CONNECT: 'Error Connecting to the database',
        ERR_QUERY: 'Error executing the query'
    }

    /**
     * Returns the MySQL Connection
     * @returns mysql.Connection
     */
    getConnection(): mysql.Connection{
        return mysql.createConnection(dbConfig);
    }




    executeQuery(query: string): Promise<any>{
        return new Promise( (resolve, reject)=>{
            this.getConnection().connect( (err)=>{
                /**
                 * If there is an error, reject the promise
                 */
                if (err){
                    this.error(err);
                    reject(this._errors.ERR_CONNECT);
                }else{
                    /**
                     * Lets execute the query
                     */
                    this.getConnection().query(query, (err: mysql.MysqlError, result: any)=>{

                        /**
                         * If there is an error, reject the promise
                         */
                        if(err){
                            this.error(err);
                            reject(this._errors.ERR_QUERY);
                        }else{
                            /**
                             * If everything is ok, resolve the promise
                             */
                            resolve(result);
                        }
                    });

                }
            });

        });
    }

    log(t:any){
        console.log('[MYSQL]',t);
    }

    error(t:any){
        console.error('[MYSQL]',t);
    }

}

export default new DB();