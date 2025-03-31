
class ConsoleClass {


    /************************************************************************
     * Constructor.
     * It will start the time counting using the momentjs library
     * @link https://momentjs.com/
     ***********************************************************************/
    constructor() {
        
    }


    /************************************************************************
     * Shorten for the con method.
     * @param t
     ***********************************************************************/
    c(t: any): ConsoleClass {
        try {
            if (typeof t === 'string') {
                console.log(' ' + t);
            } else {
                console.log(t);
            }

        } catch (e) {

        }
        return this;
    }

    /************************************************************************
     * Display line command console.
     * @param t
     ***********************************************************************/
    l(t: any): ConsoleClass {

        if(typeof t === 'string'){
            try {
                console.log(' -' + t);
            } catch (e) {

            }
        }else{
            console.log(t);
        }
        return this;
    }

    /************************************************************************
     * Error method.
     * @param t
     ***********************************************************************/
    e(t: any): ConsoleClass {
        if(typeof t === 'string'){
            try {
                console.error(' [ERROR] ' + t);
            } catch (e) {

            }
        }else{
            console.error(t);
        }
        return this;

    }

    /************************************************************************
     * Prints a general message
     * @param t
     * @deprecated
     ***********************************************************************/
    con(t: string): ConsoleClass {
        return this.c(t);

    }

    /************************************************************************
     * Prints an space
     * @deprecated
     ***********************************************************************/
    space() {
        return this.s();
    }

    /************************************************************************
     * Shorter for space
     ***********************************************************************/
    s() {
        return this.c(' ');
    }

    /************************************************************************
     * Prints a level process. The higher the level, the far from the main line the text
     * will show up
     * @param t
     * @param l
     ***********************************************************************/
    level(t: string, l: number = 1): ConsoleClass {
        const message = ('-').repeat(l) + ' ' + t;
        return this.con(message);
    }

    /************************************************************************
     * It prints the title
     * @param t
     ***********************************************************************/
    title(t: string, sideSpace: number = 6, sideCharacter: string = '▓', lineCharacter: string = '▓'): ConsoleClass {
        const titleSize = t.length;
        this.con(sideCharacter + lineCharacter.repeat(sideSpace + sideSpace + titleSize) + sideCharacter);
        this.con(sideCharacter + (' ').repeat(sideSpace + sideSpace + titleSize) + sideCharacter);
        // this.con(sideCharacter + (' ').repeat(sideSpace + sideSpace + titleSize) + sideCharacter);
        this.con(sideCharacter + (' ').repeat(sideSpace) + t + (' ').repeat(sideSpace) + sideCharacter);
        // this.con(sideCharacter + (' ').repeat(sideSpace + sideSpace + titleSize) + sideCharacter);
        this.con(sideCharacter + (' ').repeat(sideSpace + sideSpace + titleSize) + sideCharacter);
        this.con(sideCharacter + lineCharacter.repeat(sideSpace + sideSpace + titleSize) + sideCharacter);
        return this;
    }



}

export default new ConsoleClass();
