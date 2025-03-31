/**
 * This scripts reads all the games from the database and then analyzes them.
 */
import ConsoleClass from "./class/Console.class";
import DBClass from "./class/DB.class";
import GameModel from "./model/Game.model";
import * as _ from "lodash";
import * as fs from "fs-extra";
import globalConfig from "./config/global.config";
import path from "node:path";

type gameAnalysisResult = {
    name: string,
    image: string,
    owned: string[]
};


function generateHtmlFile(games: gameAnalysisResult[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        ConsoleClass.c('Generating HTML File');


        const result = _.sortBy(games,'name');

        const rows = result.map((game: gameAnalysisResult) => {
            return `
    <tr>
        <td>
            <img src="${game.image}" style="max-width: 150px;" />
        </td>
        <td>
            ${game.name}
        </td>
        <td>
            ${game.owned.join('<br />')}
        </td>
    </tr>
    `;
        }).join('');

        const html: string = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Game Comparison</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col">
            <table width="100%" border="1" class="table table-striped">
                <thead>
                <tr>
                    <th>IMAGE</th>
                    <th>GAME</th>
                    <th>OWNED BY</th>
                </tr>
                </thead>
                <tbody>
                ${rows}
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
</html>
        `;


        fs.writeFile(path.join(globalConfig.output, globalConfig.outputFile), html, (err: any) => {
            if (err) {
                reject('Error writing the file');
            }
            resolve(true);
        });


    });
}

/**
 * This will analyze the games and produce a result of the type
 * {
 *     name: string,
 *     image: string,
 *     owned: string[]
 * }
 * @param games
 */
function analyzeGames(games: GameModel[]): Promise<gameAnalysisResult[]> {
    return new Promise<gameAnalysisResult[]>((resolve, reject) => {
        ConsoleClass.c('Analyzing all the games');

        const results: any[] = [];

        const gamesById: any = _.groupBy(games, 'id');

        ConsoleClass.c('Games Grouped by ID').c(gamesById);

        Object.keys(gamesById).forEach(function (x: string) {
            const currentGame = gamesById[x];
            results.push(
                {
                    name: currentGame[0].title,
                    image: currentGame[0].image,
                    owned: currentGame.map((game: any) => {
                        return game.user
                    })
                }
            );
        });

        fs.writeFile('./../ui/src/data/organized.json', JSON.stringify(results), (err: any) => {
            // Nothing to do right now
        });


        resolve(results);
    });
}


/**
 * Function to read all the games
 */
function readAllGames(): Promise<GameModel[]> {
    return new Promise<GameModel[]>((resolve, reject) => {

        DBClass.executeQuery('SELECT * FROM collection')
            .then((result: any) => {
                ConsoleClass.c('All games read');


                const games: GameModel[] = result.map((game: any) => {
                    return {...game} as GameModel;
                });
                // ConsoleClass.c(games);
                fs.writeFile('./../ui/src/data/games.json', JSON.stringify(games), (err) => {
                   // Nothing to do right now
                });
                resolve(games);
            }).catch((error: any) => {
            reject('Error reading all the games');
        });


    });
}


/**
 * Main Function
 */
function main(): void {

    ConsoleClass.title('BGG User read and storage process').title('Post Analysis').s().s();

    readAllGames().then((games: GameModel[]) => {

        analyzeGames(games).then((result: gameAnalysisResult[]) => {

            ConsoleClass.c('Results').c(result);

            generateHtmlFile(result).then((result: boolean) => {
                ConsoleClass.c('HTML File Generated');
                process.exit(0);
            }).catch((error: any) => {
                ConsoleClass.e('Error generating the HTML File');
                ConsoleClass.e(error);
                process.exit(3);
            });

        }).catch((error: any) => {
            ConsoleClass.e('Error analyzing the games');
            ConsoleClass.e(error);
            process.exit(2);
        });


    }).catch((error: any) => {
        ConsoleClass.e('Error reading all the games');
        ConsoleClass.e(error);
        process.exit(1);
    });


}


main();