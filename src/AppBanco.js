import React, {Component} from 'react';
import {ToastAndroid,Button, StyleSheet, Text, TextInput, Picker, View, Switch, CheckBox, Slider, ScrollView} from 'react-native';

export default class AppBanco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneda: 1,
            capitalInicial: '0',
            capitalFinal: 0,

            swAvisarEmail: false,
            chkCondiciones: false,
            tiEmail: 'foobar@example.org',
            tiCUIT: '00-00000000-0',
            sDias: 10,
            tResultados: '',
            tIntereses: '0 USD'
        };

        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.interesesUpdate = this.interesesUpdate.bind(this);
    }

    interesesUpdate() {

        var coin = "";
        if (this.state.moneda == 1) {
            coin = "USD";
        } else if (this.state.moneda == 2) {
            coin = "ARS";
        }

        if (!this.state.capitalInicial || parseFloat(this.state.capitalInicial) < 0.0) {
            this.setState(
                { capitalFinal: 0 },
                () => { this.setState({ tIntereses: '0 ' + coin }); }
            );
            return;
        }

        var m = parseFloat(this.state.capitalInicial);
        var tasa = 0.0;
        if (this.state.sDias < 30) {
            if (m <= 5000) { tasa = 25.0; }
            else if (m > 5000 && m <= 99999) { tasa = 30.0; }
            else if (m > 99999) { tasa = 35.0; }

        } else if (this.state.sDias >= 30) {
            if (m <= 5000) { tasa = 27.5; }
            else if (m > 5000 && m <= 99999) { tasa = 32.3; }
            else if (m > 99999) { tasa = 38.5; }
        }

        this.setState(
            { capitalFinal: m * ( (Math.pow((1 + tasa/100), this.state.sDias/360)) - 1 ) },
            () => { this.setState({ tIntereses: this.state.capitalFinal + " " + coin }); }
        );
    }

    hacerPlazoFijo() {
        var err = [];
        if (!this.state.tiEmail || !this.state.tiEmail.replace(/\s+/g, '')) {
            err.push("El campo Email es obligatorio");
        }
        if (!this.state.tiCUIT || !this.state.tiCUIT.replace(/\s+/g, '')) {
            err.push("El campo CUIT es obligatorio");
        }
        if (!this.state.moneda || this.state.moneda < 1 || this.state.moneda > 2) {
            err.push("El campo Moneda es incorrecto");
        }
        if (!this.state.capitalInicial || parseFloat(this.state.capitalInicial) <= 0) {
            err.push("El campo Monto debe ser mayor a 0");
        }

        var print_msg = "";

        if (err.length != 0) {
            print_msg = "Error al generar plazo fijo\n";
            for (var i=0; i<err.length; i++) { print_msg = print_msg + err[i] + "\n"; }

        } else {
            print_msg = "Plazo fijo Realizado!\n\n-- Info --\n" +
                "Capital Inicial: " + this.state.capitalInicial + "\n" + 
                "Capital Final: " + this.state.capitalFinal.toString() + "\n" +
                "Email: " + this.state.tiEmail + "\n" +
                "CUIT: " + this.state.tiCUIT + "\n" +
                "Moneda: " + this.state.moneda + "\n" +
                "Dias: " + this.state.sDias.toString() + "\n" +
                "Avisar por Email: " + this.state.swAvisarEmail.toString() +"\n";
        }

        this.setState({ tResultados: print_msg });
    }

    checkBoxChange() {
        this.setState({chkCondiciones: !this.state.chkCondiciones});
        if (this.state.chkCondiciones) {
            ToastAndroid.show('Es obligatorio aceptar las condiciones', ToastAndroid.LONG);
            this.setState({tResultados: ''});
        }
    }

    render() {
        return (
            <View style={styles.top}>
                <ScrollView>
                    <Text>Correo Electronico</Text>
                    <TextInput
                        underlineColorAndroid='black'
                        onChangeText={(text) => this.setState({tiEmail:text})}
                        value={this.state.tiEmail}
                        keyboardType='email-address'
                    />
                    <Text>CUIT</Text>
                    <TextInput
                        underlineColorAndroid='black'
                        onChangeText={(text) => this.setState({tiCUIT:text})}
                        value={this.state.tiCUIT}
                    />
                    <Text>Moneda</Text>
                    <Picker
                        style={{width: 200}}
                        selectedValue={this.state.moneda}
                        onValueChange={(valor) => this.setState(
                            {moneda:valor},
                            () => { this.interesesUpdate(); }
                        )}>
                        <Picker.Item label="Dolar" value="1" />
                        <Picker.Item label="Pesos ARS" value="2" />
                    </Picker>
                    <Text>Monto</Text>
                    <TextInput
                        underlineColorAndroid='black'
                        onChangeText={(text) => this.setState(
                            {capitalInicial:text},
                            () => { this.interesesUpdate(); }
                        )}
                        value={this.state.capitalInicial}
                        keyboardType='number-pad'
                    />
                    <Text>Dias</Text>
                    <Slider
                        minimumValue={1}
                        maximumValue={180}
                        onValueChange={(days) => this.setState(
                            {sDias:days},
                            () => { this.interesesUpdate(); }
                        )}
                        step={1}
                        value={this.state.sDias}
                    />
                    <Text>{this.state.sDias}{" días de plazo"}</Text>
                    <View style={styles.calculatedTotal}>
                        <Text>{this.state.tIntereses}</Text>
                    </View>
                    <View style={styles.horizontalComponent}>
                        <Text>Avisar por mail</Text>
                        <Switch
                            style={{flex: 1}}
                            onValueChange={() => this.setState({swAvisarEmail: !this.state.swAvisarEmail})}
                            value={this.state.swAvisarEmail}
                        />
                    </View>
                    <View style={styles.horizontalComponent}>
                        <CheckBox 
                            title=''
                            value={this.state.chkCondiciones}
                            onChange={this.checkBoxChange}
                        />
                        <Text>Acepto Términos y Condiciones</Text>
                    </View>
                    <Button 
                        title="Hacer Plazo Fijo"
                        disabled={!this.state.chkCondiciones}
                        onPress={this.hacerPlazoFijo}>
                    </Button>
                    <Text>{this.state.tResultados}</Text>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    horizontalComponent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    top: {
        borderTopColor: 'black',
        borderTopWidth: 10,
    },
    calculatedTotal: {
        flex: 1,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
});
