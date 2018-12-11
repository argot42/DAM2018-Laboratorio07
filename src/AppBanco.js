import React, {Component} from 'react';
import {ToastAndroid,Button, StyleSheet, Text, TextInput, Picker, View, Switch, CheckBox, Slider} from 'react-native';

export default class AppBanco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneda:1,
            capitalInicial:0,
            capitalFinal:0,

            swAvisarEmail: false,
            chkCondiciones: false,
            tiEmail: 'foobar@example.org',
            tiCUIT: '00-00000000-0',
            tiMonto: '0',
            sDias: 10
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
                <TextInput
                    onChangeText={(text) => this.setState({tiEmail:text})}
                    value={this.state.tiEmail}
                />
                <Text>CUIT</Text>
                <TextInput
                    onChangeText={(text) => this.setState({tiCUIT:text})}
                    value={this.state.tiCUIT}
                />
                <Text>Moneda</Text>
                <Picker
                    style={{width: 200}}
                    selectedValue={this.state.moneda}
                    onValueChange={(valor) => this.setState({moneda:valor})}>
                    <Picker.Item label="Dolar" value="1" />
                    <Picker.Item label="Pesos ARS" value="2" />
                </Picker>
                <Text>Monto</Text>
                <TextInput
                    onChangeText={(text) => this.setState({tiMonto:text})}
                    value={this.state.tiMonto}
                />
                <Text>Dias</Text>
                <Slider
                    minimumValue={1}
                    maximumValue={180}
                    onValueChange={(days) => this.setState({sDias:days})}
                    step={1}
                    value={this.state.sDias}
                />
                <Text>{this.state.sDias}{" dias"}</Text>
                <Switch
                    onValueChange={(value) => this.setState({swAvisarEmail: !this.state.swAvisarEmail})}
                    value={this.state.swAvisarEmail}
                />
                <Text>Avisar por mail</Text>
                <CheckBox 
                    title='Acepto condiciones'
                    value={this.state.chkCondiciones}
                    onChange={(value) => this.setState({chkCondiciones: !this.state.chkCondiciones})}
                />
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
