import React, { useState } from 'react'
import spamCheck from '../../../Assets/spamCheck.png';
import axios from 'axios';

const API_URL = import.meta.env.VITE_HOST;

const SpamNumCheck = () => {
    const [number, setNumber] = useState('');
    const [info, settInfo] = useState('')
    const [fnum, setFnum] = useState('')
    const [loading, setLoading] = useState(false);
    let num = null;
    console.log(info);
    const handleSubmit = async () => {
        console.log('here');
        setLoading(true);
        axios(`${API_URL}/getInfo/${number}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            setLoading(false);
            if (res.data.body === false) {
                alert('No data found');
                return;
            } else {
                console.log(res.data.body);
                settInfo(res.data.body);
                setFnum(number);
            }
        }).catch(err => {
            alert('Error fetching data');
            setLoading(false);
            console.log(err);
        })
    }

    const handleChange = (e) => {
        setNumber(e.target.value);
    }
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    function blurEmail(email) {
        var parts = email.split('@');
        if (parts.length !== 2) {
            return email;
        }

        var username = parts[0];
        var domain = parts[1];

        if (username.length < 4) {
            return email;
        }
        var blurredUsername = username.substring(0, username.length - 3) + '***';

        return blurredUsername + '@' + domain;
    }
    return (
        <div>
            <div className="gpt3__header section__padding" id="home">
                <div className="gpt3__header-content">
                    <h1 className="gradient__text">Check Phone Info</h1>
                    <p className='text2'>Easily retrieve user details using their phone number <br /> Powered by <span style={{ color: '#2589ff', backgroundColor: 'aliceblue', padding: '0 0.35rem 0 0.25rem', borderRadius: '5px', fontWeight: '600' }}>Truecaller</span></p>
                    <div className="num">
                        <input type="text" placeholder="Enter Phone Number " onChange={handleChange} />
                        {loading ? <p>Loading...</p> :
                            <button type="button" onClick={handleSubmit}>Submit</button>}
                    </div>
                </div>
                {!info && (
                    <div className="gpt3__header-image vert-move">
                        <img style={{ scale: "1.25" }} src={spamCheck} />
                    </div>)
                }
                {info && (
                    <div className="gpt3__header-image glass" style={{ display: 'flex', flexDirection: 'column' }}>


                        <table className="info">
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>{info.name}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{blurEmail(info.email)}</td>
                                </tr>
                                <tr>
                                    <th>Phone:</th>
                                    <td>{fnum}</td>
                                </tr>
                                <tr>
                                    <th>Country:</th>
                                    <td>{regionNames.of(info.country)}</td>
                                </tr>
                                <tr>
                                    <th>RuleName:</th>
                                    <td>{info.ruleName ? info.ruleName : "-"}</td>
                                </tr>
                                <tr>
                                    <th>Carrier</th>
                                    <td>{info.carrier}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    )
}

export default SpamNumCheck
