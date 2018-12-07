import React, {Component} from 'react';
import {ToastAndroid,Button, StyleSheet, Text, TextInput, Picker, View, Switch, CheckBox, Slider} from 'react-native';

export default class AppBanco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneda:1,
            capitalInicial:0,
            capitalFinal:0
        };
        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
    }

    hacerPlazoFijo() {
        ToastAndroid.show('Presiono el boton de hacer plazo fijo!', ToastAndroid.LONG);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Correo Electronico</Text>
                <TextInput>correo@mail.com</TextInput>
                <Text>CUIT</Text>
                <TextInput>00-00000000-0</TextInput>
                <Text>Moneda</Text>
                <Picker
                    style={{width: 200}}
                    selectedValue={this.state.moneda}
                    onValueChange={(valor) => this.setState({moneda:valor})}>
                    <Picker.Item label="Dolar" value="1" />
                    <Picker.Item label="Pesos ARS" value="2" />
                </Picker>
                <Text>Monto</Text>
                <TextInput>000</TextInput>
                <Text>Dias</Text>
                <Slider></Slider>
                <Text>10 dias</Text>
                <Switch></Switch>
                <Text>Avisar por mail</Text>
                <CheckBox title='Acepto condiciones'/>
                <Button title="Hacer Plazo Fijo"
                    color="#FF0000"
                    onPress={this.hacerPlazoFijo}>
                </Button>
                <Text>[[ RESULTADO DE LA OPERACION ]]</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
