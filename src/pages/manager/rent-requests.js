import {Button, ButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";
import {variants} from '../static-pages-data/navigate'
import {rentRequests, denyRequest, confirmRequest} from "../../server-requests/api-requests"
import Request from "../../components/request";
import '../../styles/navigation.css'

function RentRequests() {
    const [requests, setRequests] = useState(null)


    const [sport, setSport] = useState(variants[0].name)
    const [variant, setVariant] = useState(1)

    const rent = async (var_id = null) => {
        const data = await rentRequests(var_id ?? variant)
        console.log(data, 'RENT REQUESTS')
        setRequests(data)
    }

    useEffect(() => {
        rent().then()
    }, [])


    return (

        <div>
            <div className={'button-margin'}>
                <div>
                    <ButtonGroup variant={'contained'}>
                        {
                            variants.map(v => (
                                <Button className={sport === v.name && 'selected-button-in-group'}
                                        onClick={async () => {
                                            setSport(v.name)
                                            setVariant(v.variant[0].id)
                                            await rent(v.variant[0].id)
                                        }}>
                                    {v.name}
                                </Button>
                            ))
                        }
                    </ButtonGroup>
                </div>

                <div>
                    <ButtonGroup variant={'contained'}>
                        {
                            variants.find(e => e.name === sport).variant.map(v => (
                                <Button className={variant === v.id && 'selected-button-in-group'}
                                        onClick={async () => {
                                            setVariant(v.id)
                                            await rent(v.id)
                                        }}>
                                    {v.name}
                                </Button>
                            ))
                        }
                    </ButtonGroup>
                </div>
            </div>


            <div style={{
                display: "flex",
                gap: '10px',
                flexDirection: "column",
                marginTop: '10px'
            }}>
                {
                    requests == null ? <h1 key={1}>Загрузка</h1> :
                        requests.length === 0 ? <h1 key={1}>Список пуст</h1> :
                            requests.map(request => (
                                <Request phone={request.phone}
                                         vk_url={request.vk_url}
                                         booking_times={request.requested_time}
                                         header={'Заявка №' + request.request_id}
                                         confirm={async () => {
                                             await confirmRequest(request.request_id)
                                             await rent()
                                         }}
                                         deny={async () => {
                                             await denyRequest(request.request_id)
                                             await rent()
                                         }}
                                />
                            ))
                }
            </div>
        </div>
    )
}

export default RentRequests