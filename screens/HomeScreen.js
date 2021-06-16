import React,{useState,useEffect} from 'react'
import {StyleSheet,Image, View, Text,TouchableOpacity, ActivityIndicator } from 'react-native'




const HomeScreen = () => {

    const [coinData,setCoinData] = useState(null);

    const {
        container,
        image,
        upperRow,
        coinSymbol,
        coinName,
        coinPrice,
        statisticsContainer,
        separator,
        percentChangePlus,
        percentChangeMinus,
        percentChange24h,
        percentChange7d
    } = styles;

    const getData = () => {
        let rip;
        console.log("btn pressed");
        fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&start=1&limit=10&convert=USD',{
            method: 'GET',
            headers: {
                'X-CMC_PRO_API_KEY': 'e080feea-0342-4ad3-ad48-7a6f1b606326'
            }
        })
        .then(res => res.json())
        .then(async data => {
            rip = await data.data.filter(d=> {
                if(d.id===52)
                return true
            })
            setCoinData(rip[0]);
            console.log(rip[0])
        })
    }

    useEffect(() => {
    
        getData();
        
    }, [])
    

    setInterval(getData,60000*2);
    
    return (
       <>
            {coinData?<View style={container}>
            <View style={upperRow}>
                <Image
                    style={image}
                    source={{uri:"https://e7.pngegg.com/pngimages/986/696/png-clipart-ripple-cryptocurrency-exchange-investor-blockchain-others-miscellaneous-logo-thumbnail.png"}}                
                />
                <Text style={coinSymbol}>XRP</Text>
                <Text style={separator}>|</Text>
                <Text style={coinName}>RIPPLE</Text>
                <Text style={coinPrice}>{coinData.quote.USD.price.toFixed(3)} $</Text>
            </View>

            <View style={statisticsContainer}>
                <Text style={percentChange24h}>24h:
                <Text style={coinData.quote.USD.percent_change_24h.toFixed(2) < 0 ? percentChangeMinus : percentChangePlus }> {coinData.quote.USD.percent_change_24h.toFixed(2)} % </Text>
                </Text>
                <Text style={percentChange7d}>7d:
                <Text style={coinData.quote.USD.percent_change_7d.toFixed(2) < 0 ? percentChangeMinus : percentChangePlus }> {coinData.quote.USD.percent_change_7d.toFixed(2)} % </Text>
                </Text>
            </View>
        </View>
    :
    <ActivityIndicator size="large" color="#00ff00"/>
    }
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 200,
        display: 'flex',
        marginBottom: 20,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 3,
        padding: 20
      },
    upperRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 50
    },
    coinSymbol: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5,
        fontWeight: 'bold'
      },
      coinName: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 20
      },
      separator: {
        marginTop: 10
      },
      coinPrice: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 10,
        fontWeight: 'bold'
      },
      statisticsContainer: {
        display: 'flex',
        borderTopColor: "#FAFAFA",
        borderTopWidth: 2,
        padding: 5,
        flexDirection: "row"
      },
      percentChangePlus: {
        color: "#00BFA5",
        fontWeight: "bold",
        marginLeft: 10
      },
      percentChangeMinus: {
        color: "#DD2C00",
        fontWeight: "bold",
        marginLeft: 10
      },
      percentChange24h: {
        marginLeft: 20
      },
      percentChange7d: {
        marginLeft: "auto"
      }    
  });

export default HomeScreen
