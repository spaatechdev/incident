import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Col, Row, Form, Button, Container } from "react-bootstrap";
import dynamic_urls from "../../../../env";

const QueryFunc = () => {
    const autoResp = ["Hello! How may I help you?",
        "I'm not able to understand your query, please try again!",
        "Do you want to know your incident status? If yes, then say yes!",
        "Sorry I didn't understand, do you want to know your incident status?",
        "Tell me your incident number!",
        "It's a wrong incident number, enter again!",
        x => "Your incident status is " + x
    ]

    const [incidents, setIncidents] = useState([]);
	const [incidentsErr, setIncidentsErr] = useState(0);
    const [send, setSend] = useState([])
    const [recieve, setRecieve] = useState([])

    useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					dynamic_urls.SERVER_URL+dynamic_urls.incidents,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (response.name === "AxiosError")
					setIncidentsErr(incidentsErr + 1);
				else setIncidents(response.data);
			} catch (e) {
				console.log("not auth");
			}
		})();
	}, []);

    useEffect(() => { 
        if (send.length == 1)
            setRecieve(x => [...x, autoResp[0]]);
        else if(send.length>1){
            let lastSent=send[send.length-1]
            let lastRecieved=recieve[recieve.length-1]
            if(lastRecieved==autoResp[0]||lastRecieved==autoResp[1]){
                if (lastSent.toLowerCase().includes("incident") && lastSent.toLowerCase().includes("status"))
                    setRecieve(x => [...x, autoResp[2]]);
                else
                    setRecieve(x => [...x, autoResp[1]]);
            }
            if(lastRecieved==autoResp[2]||lastRecieved==autoResp[3]){
                if (lastSent.toLowerCase().includes("yes"))
                    setRecieve(x => [...x, autoResp[4]]);
                else
                    setRecieve(x => [...x, autoResp[3]]);
            }
            if(lastRecieved==autoResp[4]||lastRecieved==autoResp[5]){
                let incident = incidents.find(x => x.customIncidentId==lastSent)
                if (incident)
                    setRecieve(x => [...x, autoResp[6](incident.incidentStatus.name)]);
                else
                    setRecieve(x => [...x, autoResp[5]]);
            }
        }
    }, [send])

    const handleSubmit = (e) => {
        e.preventDefault();
        let sent = e.target.message.value
        e.target.message.value = ""
        setSend(x => [...x, sent]);
    }

    console.log(incidents )
    return (
        <div style={{
            fontFamily: "sans-serif",
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <header>
                <h2 style={{
                    paddingLeft: 430,
                    backgroundColor: "grey",
                    marginBottom: 0,
                    paddingBottom: 10,
                    paddingTop: 10
                }}>
                    Query for Incident
                </h2>
            </header>

            <body style={{
                backgroundColor: "#CCCCCC",
                height: 378,
                overflowY: "auto"
            }}>
                <br/>
                {send.map((x,i)=>(<>
                    <p style={{
                        backgroundColor:"#005C4B",
                        textAlign:"right",
                        color:"white",
                        float:"right",
                        marginRight:20,
                        padding:7,
                        width:"fit-content",
                        borderRadius:"10px"
                    }}>{x}</p>
                    <br/>
                    <p style={{
                        backgroundColor:"#202C33",
                        color: "white",
                        marginLeft:10,
                        padding:7,
                        width:"fit-content",
                        borderRadius:"10px",
                    }}>{recieve[i]}</p>
                </>))}
            </body>
            <footer
                style={{
                    textAlign: "center",
                    marginTop: "auto",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderLeft: 0
                }}
            >
                <Form onSubmit={handleSubmit} >
                    <Row>
                        <Col sm={10}
                            style={{ paddingRight: 0 }}
                        >
                            <Form.Group controlId="message">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="message"
                                    required
                                    placeholder=""
                                ></textarea>
                            </Form.Group>
                        </Col>
                        <Col sm={2}
                            style={{
                                paddingLeft: 0
                            }}
                        >
                            <Form.Group>
                                <Button variant="primary" type="submit" style={{
                                    borderRadius: 0,
                                    width: "100%",
                                    height: 86
                                }}>
                                    Send
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </footer>
        </div>
    )
}


export default QueryFunc
