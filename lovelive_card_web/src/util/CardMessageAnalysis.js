const japAndKorMessage = (msgJp, msgKr) => ({
    totalMessage : `${msgJp}${msgKr ? '<br />' + msgKr : ''}`,
    hasKorean : msgKr ? true : false,
    jpMessage : msgJp
});

const japAndKorMessageOfMap = (key, msgJp, msgKr) => {
    const jpMessage = msgJp[key];
    const krMessage = msgKr[key];
    return {
        totalMessage : `${jpMessage}${krMessage ? '<br />' + krMessage : ''}`,
        hasKorean : krMessage ? true : false,
        jpMessage : jpMessage
    };
}

const japAndKorMessageWithDate = (key, msgJp, msgKr, msgDT, unitText) => {
    const jpMessage = msgJp[key];
    const krMessage = msgKr[key];
    const startDate = msgDT[key]["start"];
    const endDate = msgDT[key]["end"];
    return {
        totalMessage : `${startDate}${unitText} ~ ${endDate}${unitText}<br />${jpMessage}${krMessage ? '<br />' + krMessage : ''}`,
        hasKorean : krMessage,
        jpMessage : jpMessage
    }
}

export default function(message) {
    const context = message && message.context;
    if(context === null) return null;
    else {
        let messages = {};
        const jsonData = JSON.parse(context);
        let originalKeys = Object.keys(jsonData);
        let typeKeys = 
            originalKeys.slice()
                .map(key => key.split('_')[0])
                .reduce((a, b) => {
                    if (a.slice(-1)[0] !== b) 
                        a.push(b);
                    return a;
                }, []);

        for(let k = 0; k < typeKeys.length; k++){
            let jpKey = `${typeKeys[k]}_jp`;
            let krKey = `${typeKeys[k]}_kr`;
            let tmpKey = null;
            
            if(typeKeys[k] === 'time'){
                tmpKey = `${typeKeys[k]}_time`;
            } else if(typeKeys[k] === 'period'){
                tmpKey = `${typeKeys[k]}_date`;
            }

            if(typeKeys[k] === 'skill'){
                let message = japAndKorMessage(jsonData[jpKey], jsonData[krKey]);
                Object.assign(messages, { [typeKeys[k]] : message });
            } else {
                if(!Array.isArray(jsonData[jpKey])){
                    let tmpMsgs = [];
                    for(let key in jsonData[jpKey]){
                        if(tmpKey !== null)
                            tmpMsgs.push(japAndKorMessageWithDate(key, jsonData[jpKey], jsonData[krKey], jsonData[tmpKey], [typeKeys[k]] === 'time' ? '시' : ''));
                        else
                            tmpMsgs.push(japAndKorMessageOfMap(key, jsonData[jpKey], jsonData[krKey]));
                    }
                    Object.assign(messages, { [typeKeys[k]] : tmpMsgs });
                } else {
                    Object.assign(messages, { [typeKeys[k]] : [] });
                }
            }
            
        }
        
        return messages;
    }
}