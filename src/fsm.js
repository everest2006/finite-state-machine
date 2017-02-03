class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config)
        {return onerror}
        this.config = config;
        this.config['initial'] = 'normal';
        this.transition_history = new Array;
        this.transition_history[0]=this.config['initial'];
        this.counter= 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.config['initial'];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config['states'][state]) {
                this.config['initial'] = state;
                this.transition_history[++this.counter]=state;
            }
            else {

                throw new Error;
            }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config['states'][this.getState()]['transitions'][event])
        {
            this.changeState(this.config['states'][this.getState()]['transitions'][event]);
        }
        else
        {
            throw new Error;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.config['initial'] = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var allstates = [];
        if(event==undefined)
        {
            for (var variable in this.config['states'])
            {
                allstates[allstates.length++]=variable;
            }
            return allstates;
        }
        else {
            for (var variable in this.config['states']) {
                if(this.config['states'][variable]['transitions'][event]) {
                    allstates[allstates.length++]=variable;
                }
            }
            return allstates;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.transition_history[this.counter-1])
        {
            this.config['initial']=this.transition_history[--this.counter];
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.transition_history[this.counter+1])
        {
            this.config['initial']=this.transition_history[++this.counter];
            return true;
        }
        else
        {
            return false;
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.transition_history = new Array;
        this.counter= undefined;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
