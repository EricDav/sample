const axios =  require('axios');
async function getMatchesFromSportyBetBookingCode(country) {
    try {
        const { data: axiosData } = await axios.get(`https://www.sportybet.com/api/${country}/orders/share/36E09CB1`);
        console.log(axiosData.data, 'matches.....')
        const matches = axiosData.data.outcomes.map((outcome) => {
            const market = outcome.markets
            console.log(market)
            return {
                home: outcome.homeTeam,
                away: outcome.awayTeam,
                outcome: market[0].product
            }
        });

        return matches;
    } catch(err) {
        console.log(err)
    }
}

async function getMatchesFromBetkingBookingCode(code) {
    try {
        const { data: axiosData } = await axios.get(`https://sportsapi.betagy.services/api/BetCoupons/Booked/${code}/en`);
        const matches = [];
        const { Odds: data } = axiosData.BookedCoupon;
        matches = data.forEach((eachMatch) => {
            const homeAway = eachMatch.MatchName.split('-');
            return {
                home: homeAway[0],
                away: homeAway[1],
                outcome: eachMatch.SelectionName
            }
        })
    
        return matches;
    } catch(err) {
        console.log(err);
    }
}

async function getMatchesFromBet9jaCode(code) {
    try {
        const { data: axiosData } = await axios.get(`https://coupon.bet9ja.com/desktop/feapi/CouponAjax/GetBookABetCoupon?couponCode=${code}`);
        const { D: data } = axiosData;
        const matches = [];
        for (key in data) {
            const homeAway = data[key].E_NAME.split('-')
            matches.push({
                home: homeAway[0],
                away: homeAway[1],
                outcome: data[key].SGN,
                date: data[key].STARTDATE
            })
        }

        return matches;
        //  3YZTMKL
    } catch(err) {

    }
}

async function getMatchesFrom1xbetBookingCode(code) {
    try {
        const url = 'https://ng.1x001.com/service-api/LiveBet/Open/GetCoupon';
        const { data: axiosData} = await axios.post(url, {"Guid":code,"CfView":0,"Lng":"en","partner":159});

        const data = axiosData.Value.Events;
        const matches = data.map((event) => {
            return {
                home: event.Opp1,
                away: event.Opp2,
                outcome: event.MarketName,
                date: new Date(data[1].DateStart.replace(/[^0-9]/g,""))
            }
        });

        return matches;

    } catch(err) {
        console.log(err);
    }
}

// getMatchesFromSportyBetBookingCode('ng');
getMatchesFrom1xbetBookingCode('HYTRC');
