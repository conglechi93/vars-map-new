export const loadState = (state) => {
    try {
        const serializedState = localStorage.getItem(state);
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (name, state) => {
    console.log(state);
    if(state == undefined) {
        if(loadState(name) == undefined) localStorage.setItem(name, '0');
    }
    else {
        try{
            const serializedState = JSON.stringify(state);
            localStorage.setItem(name, serializedState);
        } catch (err){
            return undefined;
        }
    }  
}