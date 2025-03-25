/**
 * This script reads the user from the database and then reads the games from the user from the bgg api.
 * Then it stores the games in the database.
 *
 */

import ConsoleClass from "./class/Console.class";
import DBClass from "./class/DB.class";
import UserModel from "./model/User.model";
import GameModel from "./model/Game.model";
import queryConfig from "./config/query.config";
import {bgg} from 'bgg-sdk';
import * as fs from 'fs-extra';
import * as mysql from "mysql";

function storeAllGamesAndRecordUser(user: string, games: GameModel[]): Promise<boolean> {

    ConsoleClass.c('Storing all games and recording the user');

    return new Promise((resolve, reject) => {

        /**
         * First we need to delete all games from the user.
         */
        DBClass.executeQuery(queryConfig.DELETE_ALL_FROM_USER.replace('[USER]', user))
            .then(res => {

                /**
                 * Now we need to insert all the games
                 */

                /**
                 * We create all the queries to insert the games into the database as promises
                 */
                const queriesInsert: string[] = games.map((game: GameModel) => {
                    return `
                         (${mysql.escape(game.id)},${mysql.escape(game.name)},'',${mysql.escape(game.image)},${mysql.escape(user)})
                    `;
                });

                const q = `
                    INSERT INTO collection(id,title,version,image,user) VALUES ${queriesInsert.join(',')}
                `;


                fs.writeFile('temp/query.txt', q, (err) => {
                    if(err) {
                        reject('Error writing the query to a file');
                    }
                    ConsoleClass.c('Query written to file');
                    ConsoleClass.c('Starting to insert all the games. This process may take a while');
                    DBClass.executeQuery(q).then((result: any) => {
                        ConsoleClass.c('All games inserted');

                        ConsoleClass.c('Updating the last checked user');

                        DBClass.executeQuery(queryConfig.UPDATE_LAST_CHECKED_USER.replace('[USER]', user)).then((result: any) => {
                            ConsoleClass.c('Last checked user updated');
                            resolve(true);
                        }).catch((error: any) => {
                            ConsoleClass.e('Error updating the last checked user');
                            ConsoleClass.e(error);
                            reject('Error updating the last checked user');
                        });
                        // resolve(true);
                    }).catch((error: any) => {
                        ConsoleClass.e('Error inserting the games');
                        // ConsoleClass.e(error);
                        reject('Error inserting the games');
                    });

                });



            })
            .catch((error) => {
                ConsoleClass.e(error);
                reject('Error deleting the user games');
            });

    });
}


function getAllUserGames(user: string): Promise<GameModel[]> {

    return new Promise((resolve, reject) => {

        bgg.collection({
            username: user,
            own: 1,
            // excludesubtype: 'boardgameexpansion',
        }).then((result: any) => {
            ConsoleClass.c('Got results').c(result);
            const games: GameModel[] = result.items as GameModel[];
            ConsoleClass.c('Got the user games').c(games);
            resolve(games);
        }).catch((error: any) => {
            ConsoleClass.e('Error getting the user games');
            ConsoleClass.e(error);
            reject(error);
        });

    });
}

function getUserToCheck(): Promise<UserModel> {
    return new Promise((resolve, reject) => {

        ConsoleClass.c('Getting the user to check');
        DBClass.executeQuery(queryConfig.LAST_CHECKED_USER).then((result: any) => {
            const user: UserModel = {...result[0]} as UserModel;
            ConsoleClass.c('Got results').c(user);
            resolve(user);
        }).catch((error: any) => {
            reject(error);
            ConsoleClass.e('Error reading the user to check');
        });

    });
}


/**
 * Main Functions
 */
function main(): void {
    ConsoleClass.title("BGG User read and storage process");
    ConsoleClass.s();
    getUserToCheck().then((result: UserModel) => {

        getAllUserGames(result.user).then((games: GameModel[]) => {
            storeAllGamesAndRecordUser(result.user, games).then((result: boolean) => {
                ConsoleClass.s().s().c('Ending Application');
                process.exit(0);
            }).catch((error: any) => {
                process.exit(3)
            });
        }).catch((error: any) => {
            process.exit(2);
        });


    }).catch(() => {
        // ConsoleClass.c('ENDING APPLICATION');
        process.exit(1);
    });
}

main();