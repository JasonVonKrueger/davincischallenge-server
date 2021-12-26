module.exports = class Player {
    constructor() { 
        //this.player_id = this.createUniqueID()
    }

    // ****************************************************************
    // create unique ID
    createUniqueID() {
        function chr4() {
            return Math.random().toString(16).slice(-4)
        }

        return 'PLYR-' + chr4() + '-' + chr4()
    }     

    getScore(player) {
        return this.score
    }  
}
