import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Image } from 'react-native'
import { TouchableOpacity, ScrollView, FlatList } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-loading-spinner-overlay'
import images from '../../assets/images'
import { Appbar } from 'react-native-paper';
import WalletScreen from "../vendor/WalletScreen";

const TutorialsScreen = ({ navigation }) => {
    const [showList, setShowList] = useState(false);
    const [chosenCategory, setChosenCatgeory] = useState('Select Category')
    const [chosenSubCategory, setChosenSubCategory] = useState([])
    const [vendorPersonal, setVendorPersonal] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [showSubCategory, setShowSubCategory] = useState(false)
    const [prerequisite, setPreRequisite] = useState([])
    const [tutorials, setTutorials] = useState([])
    const show = () => {
        setShowList(!showList)
        if (showList == true)
            setChosenCatgeory('Select Category')
    }

    const fetchData = async () => {
        let contact = await AsyncStorage.getItem('contact')
        let role = await AsyncStorage.getItem('role')
        let middleware = ''
        if (role == 'CSVD') {
            middleware = 'vendor'
        } else {
            middleware = 'supervisor'
        }
        console.log(contact + '  ' + role)
        let result = await fetch('https://uniworksvendorapis.herokuapp.com/' + middleware + '/' + contact)
            .then(response => {
                return response.json()
            }).then(json => {
                if (middleware == 'supervisor') {
                    setVendorPersonal(json.supervisor)
                    saveDetails(json.supervisor)
                } else {
                    setVendorPersonal(json.vendor)
                    saveDetails(json.supervisor)
                }
                setCategoryDetails(json.categorydetails)
                setChosenCatgeory(json.categorydetails[0].categoryName)
                showSubcategories(json.categorydetails[0].id)
            })
        console.log(categoryDetails)
    }
    const saveDetails = async (val) => {
        await AsyncStorage.setItem('userName', val.userName)
        await AsyncStorage.setItem('vendorId', JSON.stringify(val.id))
    }
    useEffect(() => {
        fetchData()
    }, []);
    const showSubcategories = (id) => {
        categoryDetails.forEach(element => {
            if (id == element.id) {
                setChosenSubCategory(element.subcategories)
                setShowSubCategory(true)
            }
        })

    }
    const renderNames = ({ item }) => {
        return (
            <View style={{
                backgroundColor: "rgba(255,255,255,1)",
                borderWidth: 1,
                borderColor: "rgba(112,112,112,1)",
                borderStyle: "solid",
                borderRadius: 30,
                paddingStart: 18,
                paddingEnd: 18,
                width: 120,
                marginStart: '14%'
            }} >
                <TouchableOpacity onPress={() => {
                    setChosenCatgeory(item.categoryName)
                    showSubcategories(item.id)
                    setShowList(!showList)
                    setShowSubCategory(!showSubCategory)
                }}>
                    <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }} >{item.categoryName}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const showPrequisiteAndTutorials = (id) => {
        chosenSubCategory.forEach(element => {
            if (id == element.id) {
                setPreRequisite(element.prerequisites)
                setTutorials(element.tutorials)
            }
        })
    }

    const renderPrerequisite = ({ item }) => {
        return (
            <View style={{ marginStart: '12%' }} >
                <Text>- {item.description}</Text>
            </View>
        )
    }

    const renderSubcategory = ({ item }) => {
        return (
            <View style={{
                height: 60,
            }} >
                <TouchableOpacity style={{
                    backgroundColor: "rgba(255,255,255,1)",
                    borderWidth: 1,
                    borderColor: "rgba(112,112,112,1)",
                    borderStyle: "solid",
                    borderRadius: 30,
                    paddingStart: 18,
                    paddingEnd: 18,
                    width: '100%'
                }} onPress={() => showPrequisiteAndTutorials(item.id)} >
                    <Text style={{ color: '#000000', fontSize: 14, fontWeight: 'bold' }} >{item.subcategoryName}</Text>
                </TouchableOpacity>
            </View>
        )

    }

    const renderTutorials = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('VideoScreen')} >
                <View style={{ flexDirection: 'row', marginHorizontal: '10%', backgroundColor: '#ffffff' }}>
                    <Image
                        source={images.welcom1Image}
                        style={{ width: 120, height: 120, borderWidth: 2, borderBottomLeftRadius: 20 }}
                    />
                    <View style={{ flex: 1, alignSelf: 'flex-start', backgroundColor: '#ffffff' }} >
                        <Text style={{ color: '#000000', alignSelf: 'center', fontSize: 16, fontWeight: 'bold' }} >{item.topicName}</Text>
                        <Text style={{ color: '#000000', alignSelf: 'center', fontSize: 12 }} >{item.description}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    const FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 20,
                    width: "100%",
                    color: '#ffffff'
                }}
            />
        );
    }

    return (
        <ScrollView>
            {isLoading ?
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={isLoading}
                    //Text with the Spinner
                    textContent={'Loading...'}
                    //Text style of the Spinner Text
                    textStyle={{ color: '#FFF', }}
                />
                : null}
            <Appbar.Header style={{ backgroundColor: '#5FE3B9' }} >
                <Appbar.Content title="UniworksDesigns" style={{ fontSize: 20 }} />
            </Appbar.Header>

            <View style={{ flex: 1 }} >
                <View />
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: '10%', marginTop: 10 }} >
                    <View>
                        <Text style={{ color: '#000000', fontSize: 24, fontWeight: 'bold', }} >Welcome, </Text>
                        {/* <Text style={{ color: '#000000', fontSize: 20, alignSelf: 'center', textAlign: 'center' }} >{vendorPersonal.name}</Text> */}
                    </View>
                </View>
                <View style={{ flex: 1 }} >
                    <TouchableOpacity onPress={show} style={{ marginTop: '5%' }} >
                        <View style={styles.rect3} >
                            <Text style={{ alignSelf: 'center', color: '#000000', fontSize: 16 }} >{chosenCategory}</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }} />
                            <MaterialIcons name='keyboard-arrow-down' size={24} style={{ margin: 20 }} />
                        </View>
                    </TouchableOpacity>
                    {
                        showList ?
                            <View style={{ flex: 1, marginTop: 10 }} >
                                <FlatList
                                    data={categoryDetails}
                                    renderItem={renderNames}
                                    ItemSeparatorComponent={FlatListItemSeparator}
                                />
                            </View>
                            : null
                    }
                    {
                        showSubCategory ?
                            <View style={{ flex: 1, marginStart: '10%', marginTop: 20 }} >
                                <FlatList
                                    data={chosenSubCategory}
                                    renderItem={renderSubcategory}
                                    horizontal={true}
                                />
                            </View> :
                            null
                    }
                    <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold', marginStart: '10%', marginTop: 20 }} >Prequisites & Checklist</Text>
                    <View  >
                        <FlatList
                            data={prerequisite}
                            renderItem={renderPrerequisite}
                        />
                    </View>
                    <View style={{ marginTop: 30 }} >
                        <FlatList
                            data={tutorials}
                            renderItem={renderTutorials}
                        />
                    </View>
                    <View>
                        <WalletScreen />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create(
    {
        rect3: {
            width: "50%",
            height: 60,
            backgroundColor: "rgba(255,255,255,1)",
            borderWidth: 1,
            borderColor: "rgba(112,112,112,1)",
            borderStyle: "solid",
            borderRadius: 100,
            flexDirection: "row",
            paddingStart: 20,
            marginHorizontal: '8%',
        },
        subcategory: {
            height: 30,
            width: 100,
            backgroundColor: "rgba(255,255,255,1)",
            borderWidth: 1,
            borderColor: "rgba(112,112,112,1)",
            borderStyle: "solid",
            borderRadius: 100,
            paddingStart: 20,
            marginHorizontal: '8%',
        },
        bottom: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
        },
    }
)
export default TutorialsScreen;