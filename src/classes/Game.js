let ScorePatterns = require('./score_patterns.json')

module.exports = class Game {
    constructor() {
        this.game_id = this.createUniqueID()
        this.status = 'STARTED'
        this.created_on = new Date()
    }
    
    // ****************************************************************
    // create unique ID
    createUniqueID() {
        function chr4() {
            return Math.random().toString(16).slice(-4)
        }

        return 'GMID-' + chr4() + '-' + chr4()
    } 

    // ****************************************************************
    // toggle player    
    toggleCurrentPlayer() {
        this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1
    }

    // ****************************************************************
    // remove slot from available    
    removeSlot(slotID) {
        return this.availableSlots.filter(function(slot_id) { 
            return slotID != slot_id
        })
    }  

    botSelectPiece() {
        // randomly pick oval or triangle
        let randomPiece = Math.random() < 0.5

        return (randomPiece) ? 'oval' : 'triangle'      
    }

    botSetPiece() {
        let slotID = null, random_slot = null
        let triangle_slots = this.availableSlots.filter(slot => slot.indexOf('triangle') > -1 )
        let oval_slots = this.availableSlots.filter(slot => slot.indexOf('oval') > -1 ) 

        if (flipper) {
            random_slot = Math.floor(Math.random() * triangle_slots.length)
            slotID = triangle_slots[random_slot]
        }
        else {
            random_slot = Math.floor(Math.random() * oval_slots.length);
            slotID = oval_slots[random_slot]
        }

    }

    checkForScoringPattern(player_slots) {
        for (var i=0; i<ScorePatterns.length; i++) {
            let symbol = ScorePatterns[i].symbol
            let points = ScorePatterns[i].points

            for (var s=0; s<ScorePatterns[i].symbol_slots.length; s++) {
                if (this._compareSymbolArrays(ScorePatterns[i].symbol_slots[s], player_slots)) {   
                    // remove the used scoring pattern so we don't check it again
                    ScorePatterns[i].symbol_slots.splice(s, 1)
                                                
                    return { 'symbol': symbol, 'points': points, 'slots': player_slots }
                }              
            }         
        }

        return false
    }


    getBotsMove() {
        // randomly pick oval or triangle
        let random_slot = null
        let pickit = (Math.floor(Math.random() * 2) == 0)

        // let triangle_slots = this.availableSlots.filter(slot => slot.indexOf('triangle') > -1 )
        // let oval_slots = this.availableSlots.filter(slot => slot.indexOf('oval') > -1 ) 
        
        // determine available slots from the filledSlots array
        //let currently_available_slots = arrA.filter(x => !arrB.includes(x));

        if (pickit) {
            // triangle
            random_slot = Math.floor(Math.random() * this.triangle_slots.length);
        } 
        else {
            // oval
            random_slot = Math.floor(Math.random() * this.oval_slots.length);
        }

        return random_slot
    }


    compareSymbolArrays(symbol_slots, player_slots)  {
        // check player's slots against symbol slots
        for (var index=0; index<symbol_slots.length; index++) {
            if (!player_slots.includes(symbol_slots[index])) {
              return false
            }
          }

        return true;
    }
  
}

