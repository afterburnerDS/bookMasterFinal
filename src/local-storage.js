export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};



export const loadState = () => {
    try {
       
        try {
                    const serializedState = localStorage.getItem('state');
                    if(serializedState == null ){
            
                        return undefined;
                    }
            
                    return JSON.parse(serializedState);
            
                } catch(err){
            
                    return undefined;
                }
    } catch (e) {

        return undefined;
    }
};


export const saveState = (state) => {

    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(err){

        //Ignore write errors

    }
}





