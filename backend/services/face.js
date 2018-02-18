const request = require('request');

const config = require('../config.js');

async function postFaceDetectApi(url, img){
    return new Promise((resolve,reject) => {
        let payload = {
            "url": img
        }
        request.post({
            url:    config.face_url +url,
            body:   JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
                
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                else
                    console.log(error)
                    console.log(body)
                    console.log(response.statusCode)
                    reject(error);
            });

    })
}

async function postFaceIdentifyApi(url, groupId, faceId, maxNumOfCandidates, confidenceThres){
    return new Promise((resolve,reject) => {
        let payload = {
            "personGroupId": groupId,
            "faceIds" : [ faceId ],
            "maxNumOfCandidatesReturned":maxNumOfCandidates,
            "confidenceThreshold": confidenceThres
        }
        request.post({
            url:    config.face_url +url,
            body:   JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                else
                    console.log(error)
                    console.log(body)
                    console.log(response.statusCode)
                    reject(error);
            });

    })
}

async function putPersonGroup(url,personGroupId, name, userData){
    return new Promise((resolve,reject) => {
        let payload = {
            "name": name,
            "userData": userData
        }
        request.put({
            url:    config.face_url +url+personGroupId,
            body:   JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
                console.log(error)
                console.log(body)
                console.log(response.statusCode)
                if (!error && response.statusCode == 200) {
                    resolve(payload);
                }
                else
                    reject(error);
            });

    })
}

async function getPersonGroup(url,personGroupId){
    return new Promise((resolve,reject) => {
        request.get({
            url:    config.face_url +url+personGroupId,
            headers: {
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
              console.log(error)
              console.log(body)
              console.log(response.statusCode)
                if (!error && response.statusCode == 200) {
                    resolve(url);
                }
                else
                    reject(error);
            });

    })
}

async function getPersonInfo(url,personGroupId, personId){
    return new Promise((resolve,reject) => {
        request.get({
            url:    config.face_url +url+personGroupId+"/persons/"+personId,
            headers: {
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
              
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                else
                    console.log(error)
                    console.log(body)
                    console.log(response.statusCode)
                    reject(error);
            });

    })
}

async function deletePersonGroup(url,personGroupId){
    return new Promise((resolve,reject) => {
        request.delete({
            url:    config.face_url +url+personGroupId,
            headers: {
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
              console.log(error)
              console.log(body)
              console.log(response.statusCode)
                if (!error && response.statusCode == 200) {
                    resolve(url);
                }
                else
                    reject(error);
            });

    })
}

async function getListOfPersonsInGroup(url,personGroupId){
    return new Promise((resolve,reject) => {
        request.get({
            url:    config.face_url +url+personGroupId+"/persons",
            headers: {
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
              console.log(error)
              console.log(body)
              console.log(response.statusCode)
                if (!error && response.statusCode == 200) {
                    resolve(url);
                }
                else
                    reject(error);
            });

    })
}

async function postPersonInGroup(url,personGroupId, personName, personData){
    return new Promise((resolve,reject) => {
        let payload = {
            "name": personName,
            "userData": personData
        }
        request.post({
            url:    config.face_url +url+personGroupId+"/persons",
            body:   JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
              console.log(error)
              console.log(body)
              console.log(response.statusCode)
                if (!error && response.statusCode == 200) {
                    console.log("body")

                    resolve(body);
                }
                else
                    reject(error);
            });

    })
}

async function postPersonFace(url,personGroupId, personId, img){
    return new Promise((resolve,reject) => {
        let payload = {
            "url": img
        }
        request.post({
            url:    config.face_url +url+personGroupId+"/persons/"+personId+"/persistedFaces",
            body:   JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
              console.log(error)
              console.log(body)
              console.log(response.statusCode)
                if (!error && response.statusCode == 200) {
                    resolve(payload);
                }
                else
                    reject(error);
            });

    })
}

async function postStartTraining(url,personGroupId){
    return new Promise((resolve,reject) => {
        request.post({
            url:    config.face_url +url+personGroupId+"/train",
            headers: {
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
              console.log(error)
              console.log(body)
              console.log(response.statusCode)
                if (!error && response.statusCode == 202) {
                    resolve(url);
                }
                else
                    reject(error);
            });

    })
}

async function getTrainingStatus(url,personGroupId){
    return new Promise((resolve,reject) => {
        request.get({
            url:    config.face_url +url+personGroupId+"/training",
            headers: {
                'Ocp-Apim-Subscription-Key': config.face_key1
            }
          }, function(error, response, body){
              console.log(error)
              console.log(body)
              console.log(response.statusCode)
                if (!error && response.statusCode == 200) {
                    resolve(url);
                }
                else
                    reject(error);
            });

    })
}



async function detectFace(img){
    try {
        return await postFaceDetectApi("/detect/",img);
    } catch (err){
        console.log(err);
        return "Failed to get FaceId from Face API"
    }
}

async function identifyFace(img){
    try {
        let faceId = await detectFace(img);
        var faceIdString = JSON.parse(faceId);
        let faceIdParsed = faceIdString[0].faceId;
        let identifiedPersonId =  await postFaceIdentifyApi("/identify/", "bank_c", faceIdParsed, 1, 0.5);
        var personIdString = JSON.parse(identifiedPersonId)
        let personId = personIdString[0].candidates[0].personId
        let identifiedPerson = await getPerson("bank_c",personId)
        return identifiedPersonId;
    } catch (err){
        console.log(err);
        return "Failed to get FaceId from Face API"
    }
}

async function createGroup(groupId, groupName){
    try {
        let x = await putPersonGroup("/persongroups/",groupId, groupName, "Bank Customers Photo Recognition");
        return x
    } catch (err){
        console.log(err);
        return "Failed to create Person Group to Face API"
    }
}

async function getGroup(groupId, groupName){
    try {
        let x = await getPersonGroup("/persongroups/",groupId);
        console.log(x)
        return x
    } catch (err){
        console.log(err);
        return "Failed to get PersonGroup from Face API"
    }
}

async function getPerson(groupId, personId){
    try {
        let x = await getPersonInfo("/persongroups/",groupId,personId);
        return x
    } catch (err){
        console.log(err);
        return "Failed to get Person from Face API"
    }
}

async function deleteGroup(groupId){
    try {
        let x = await deletePersonGroup("/persongroups/",groupId);
        console.log(x)
        return x
    } catch (err){
        console.log(err);
        return "Failed to delete PersonGroup from Face API"
    }
}

async function getListFromGroup(groupId){
    try {
        let x = await getListOfPersonsInGroup("/persongroups/",groupId);
        console.log(x)
        return x
    } catch (err){
        console.log(err);
        return "Failed to get PersonGroup from Face API"
    }
}

async function createPerson(groupId, personName, img){
    try {
        let personId = await postPersonInGroup("/persongroups/",groupId, personName, "Individual User");
        var personIdString = JSON.parse(personId)
        let persistedFaceId = await postPersonFace("/persongroups/", groupId, personIdString['personId'],img)
        
        return persistedFaceId
    } catch (err){
        console.log(err);
        return "Failed to post a new Person to Face API"
    }
}

async function startTraining(groupId){
    try {
        
        let x = await postStartTraining("/persongroups/", groupId)
        return x
    } catch (err){
        console.log(err);
        return "Failed to start training"
    }
}

async function trainingStatus(groupId){
    try {
        let x = await getTrainingStatus("/persongroups/",groupId);
        console.log(x)
        return x
    } catch (err){
        console.log(err);
        return "Failed to get Training Status"
    }
}

//detectFace("https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/19961094_10214098937166722_4197003664055188204_n.jpg?oh=0c2a626ad813656eca38a92bd87f452c&oe=5B19B6A3")
//getGroup("bank_c")
//createPerson("bank_c","Alexandros","https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/13151574_10154041134052906_7772941137033870180_n.jpg?oh=b7677d158094af3916b267366111183f&oe=5B24D339")

//postPersonFace(("/persongroups/", "bank_c", "26611edd-11ae-4688-bcd6-59ab9615e30b","https://qph.fs.quoracdn.net/main-qimg-e98126505e8035c703f3bf29867f4dcb"))
//createGroup("bank_c","Bank Customers")
//getListFromGroup("bank_c")
//startTraining("bank_c")
//trainingStatus("bank_c")
//deleteGroup("bank_c")
//detectFace("https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/21231109_10214570981247529_5324529842013335778_n.jpg?oh=7d18095c48e5e45197e3e24a8041f1e6&oe=5B1DBF53")
identifyFace("https://scontent-lht6-1.xx.fbcdn.net/v/t31.0-8/131405_1832628299551_7520222_o.jpg?oh=258d17bf73741f4d37b382322b16403c&oe=5B25F1BF")

module.exports = {
    detectFace,
    createGroup,
    getGroup,
    createPerson,
    getListFromGroup,
    deleteGroup,
    startTraining,
    trainingStatus,
    identifyFace,
    getPerson
}