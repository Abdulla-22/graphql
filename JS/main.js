import { extractInfo, } from './extractGraphQL/extractInfo.js';
import { logUserInfo } from "./LogInfo/logUserInfo.js";
import { skills } from './LogInfo/logSkills.js';
import { finshedProjectXp, toFinshProject, exGain } from './LogInfo/projectInfo.js';
import { auditRatio } from './LogInfo/auditInfo.js';

    extractInfo().then(data => {
        logUserInfo(data);
        skills(data);
        
        toFinshProject(data);
        auditRatio(data);
        exGain(data);
        
        finshedProjectXp(data);
    })
    .catch(error => {
        console.log(error);
    });


// logUserInfo(data);