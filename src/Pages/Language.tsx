import React, { createElement, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable, ColorPropType } from "react-native";

const Language = () => {

    const [selectLang, setSelect] = useState(false); 

    const [isPressedK, setPressedK] = useState(false);
    const changePressedK = () => {
        if(isPressedK == false){
            if(selectLang == false){
                setSelect(true)
                setPressedK(true)
            }
        }
        if(isPressedK == true) {
            setSelect(false)
            setPressedK(false)
        }
    }

    const [isPressedE, setPressedE] = useState(false);
    const changePressedE = () => {
        if(isPressedE == false){
            if(selectLang == false){
                setSelect(true)
                setPressedE(true)
            }
        }
        if(isPressedE == true) {
            setSelect(false)
            setPressedE(false)
        }
    }

    const [isPressedJ, setPressedJ] = useState(false);
    const changePressedJ = () => {
        if(isPressedJ == false){
            if(selectLang == false){
                setSelect(true)
                setPressedJ(true)
            }
        }
        if(isPressedJ == true) {
            setSelect(false)
            setPressedJ(false)
        }
    }


    return (
        <View style={{flex: 1, flexDirection: "column"}}>
            <View style={{alignItems: 'center', marginTop: 47}}>
                <Text style={textStyle.gray700}>2 / 3</Text>
                <Text style={textStyle.bigBlack}>언어 선택</Text>
                <View style={{width: 351, height: 58, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={textStyle.gray200}>가능한 언어를 모두 선택하세요</Text>
                    <Text style={textStyle.gray200}>선택한 언어의 친구와 연결돼요</Text>
                </View>
            </View>

            <View style={{marginTop: 48}}>
                <Pressable style = { styles.wrapLang } onPress={changePressedK}>
                    {
                        <Text 
                        style = {{ fontSize: 36, color:`${isPressedK?"#FF787E":"#D6D9DF" }`, fontWeight:"bold"}}>
                        한국어
                        </Text>
                    }
                    {(isPressedK) &&
                    <View style = {styles.spotlight}>
                        <Text style = {styles.spotlightTxt}>1순위, 기징 능숙헤요</Text>
                    </View>
                
                    }   
                </Pressable>
                
                
                
                <Pressable style = {styles.wrapLang} onPress={changePressedE}>
                    {
                        <Text 
                        style = {{fontSize: 36, color:`${isPressedE?"#FF787E":"#D6D9DF"}`, fontWeight:"bold"}}>
                        영어
                        </Text>
                    }
                    {(isPressedE) &&
                    <View style = {styles.spotlight}>
                        <Text style = {styles.spotlightTxt}>1순위, 기징 능숙헤요</Text>
                    </View>
                
                    }
                </Pressable>
                

                <Pressable style = { styles.wrapLang} onPress={changePressedJ}>
                    {
                        <Text 
                        style = {{fontSize: 36, color:`${isPressedJ?"#FF787E":"#D6D9DF"}`, fontWeight:"bold"}}>
                        日本語
                        </Text>
                    }
                    {(isPressedJ) &&
                    <View style = {styles.spotlight}>
                        <Text style = {styles.spotlightTxt}>1순위, 기징 능숙헤요</Text>
                    </View>
                
                    }
                </Pressable>
                
            </View>
            

            <View style = {styles.wrapBtn}>
                <Pressable style= {() => [ {opacity: (isPressedK || isPressedJ || isPressedE) ? 1 : 0.3}, styles.roundBtn]}>
                    <Text style = {styles.roundBtnText}>다음</Text>
                </Pressable>
            </View>
        </View>
    );
};


const textStyle = StyleSheet.create({
    bigBlack: {
        color: '#333333',
        fontWeight: 'bold',
        width: 351,
        height: 42,
        textAlign: 'center',
        fontSize: 28,
        marginTop: 13,
    },
    gray200: {
        color: '#999999',
        fontSize: 18,
    },
    gray600: {
        color: '#B6B9BF',
    },
    gray700: {
        color: '#D6D9DF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bigGray: {
        color: '#999999',
    },
});

const styles = StyleSheet.create({
    wrapLang: {
    width: "100%",
    marginBottom: 24,
    marginLeft: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
    },

    wrapBtn: {
        position: "absolute",
        right: 30,
        bottom: 50,
        alignItems: "center",
        padding: "22 36 18",
    },

    roundBtn: {
        width: 106,
        height: 60,
        backgroundColor: "#FF787E",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },

    roundBtnText: {
        fontSize: 20,
        fontWeight: "700",
        color: "white", 
    },

    spotlight:{
        backgroundColor: "#FAE7E9",
        width: 117,
        height: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },

    spotlightTxt:{
        color: "#FF787E",
        fontSize: 12,
        fontWeight: "700",
    }
});

export default Language;
