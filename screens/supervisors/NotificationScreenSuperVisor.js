import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, _FlatList, FlatList } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Spinner from 'react-native-loading-spinner-overlay'

const NotificationSuperVisorScreen = ({ navigation }) => {
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const fetchData = async () => {
        let result = await fetch('https://uniworksvendorapis.herokuapp.com/supervisor/notifications/1 ')
            .then(response => {
                return response.json()
            })
            .then(json => {
                setUpcomingTasks(json)
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchData()
    }, []);

    const FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 20,
                    width: "100%",
                    backgroundColor: "#FFF",
                }}
            />
        );
    }

    const renderUpcomingTasks = ({ item }) => {
        return (
            <View style={{ flex: 1 }} >
                <TouchableOpacity onPress={() => navigation.navigate('StartSiteScreen')} >
                    <View style={styles.contentBox} >
                        <Text style={{ fontSize: 18 }} >Booking ID:{item.bookingId}</Text>
                    </View>
                    <View style={styles.contentBox} >
                        <Text style={{ color: '#353535', fontSize: 18, fontWeight: 'bold' }} >Kartik </Text>
                        <View style={{ flex: 1, flexDirection: 'row' }} />
                        <Text style={{ color: '#353535', fontSize: 18 }} >{item.totalArea} Sqft</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginEnd: '5%',
                        marginTop: 15,
                        marginBottom: 10
                    }} >
                        <Text  >{item.address.substring(0, 20)}...</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', bottom: 5 }} >₹ {item.budget}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >

                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={isLoading}
                    //Text with the Spinner
                    textContent={'Fetching Notifications...'}
                    //Text style of the Spinner Text
                    textStyle={{ color: '#000000', }}
                />
                

                <View style={{ flex: 1 }} >
                    <Text style={{ alignSelf: 'center', marginTop: '10%', color: '#353535', fontSize: 24, fontWeight: 'bold', marginBottom: '5%' }} >Notifications</Text>
                    <View style={styles.rect3} >
                        <TextInput
                            placeholder='Search'
                            style={styles.textInputPhone}
                        />
                        <View style={{ alignSelf: 'center', marginEnd: '2%' }}  >
                            <TouchableOpacity  >
                                <Feather name='search' size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 20,
                        flex: 1
                    }} >
                        <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 18,marginStart:"7%" }} >Upcoming Tasks</Text>
                        <FlatList
                            data={upcomingTasks}
                            style={{ marginTop: 20, marginHorizontal:'9%' }}
                            keyExtractor={item => item.bookingId}
                            renderItem={renderUpcomingTasks}
                            ItemSeparatorComponent={FlatListItemSeparator}
                        />
                    </View>
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    rect3: {
        width: "90%",
        height: 60,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "rgba(112,112,112,1)",
        borderStyle: "solid",
        borderRadius: 100,
        flexDirection: "row",
        paddingStart: 20,
        alignSelf: 'center'
    },
    textInputPhone: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        flexDirection: 'row',
        maxWidth: '88%'
    },
    mainContainer: {
        flex: 1
    },
    contentBox: {
        flexDirection: 'row',
        marginEnd: '5%',
    },
    filler: {
        flex: 1,
        flexDirection: 'row'
    }
})


export default NotificationSuperVisorScreen;