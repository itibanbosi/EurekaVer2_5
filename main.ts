enum eureka_IO {
  Aﾎﾟｰﾄ,
  Bﾎﾟｰﾄ,
  Cﾎﾟｰﾄ,
}
enum eureka_denki {
  Aﾎﾟｰﾄ,
  Bﾎﾟｰﾄ,
}
enum eureka_tlp {
  Aﾎﾟｰﾄ,
  Bﾎﾟｰﾄ,
}
enum eureka_p1416 {
  Aﾎﾟｰﾄ,
  Bﾎﾟｰﾄ,
}
enum onoff {
  ON,
  OFF,
}

enum moter_d {
  両方前,
  両方後,
  Ｌだけ前,
  Ｒだけ前,
  Ｌだけ後,
  Ｒだけ後,
  停止,
}
enum etc {
  AKARUSA,
  JINKAN,
}
enum L9110moter {
  seiten,
  gyakuten,
  seisi,
}
enum sonar_avg{
    低速高精度,
    中速中精度,
    高速低精度,
}
enum kyori{
    短い,
    長い,
}

//% color="#74ad1d" block="ﾕｰﾚｶ複合ﾕﾆｯﾄ2.6"

namespace eureka_blocks {

    //% blockId=eureka_buz_set 
    //% block=ﾕｰﾚｶIOﾎﾞｯｸｽで音をならす
    // group="1 初期設定"
    //% color="#ff3d03" 
    //% weight=90

    export function eureka_buz_set() {
    pins.analogSetPitchPin(AnalogPin.P8);
  }


    //% color="#4741f1" weight=89 blockId=eureka_tl_blue block="青信号 点灯|%mode| |%pin|" group="2_信号機ユニット"
    export function eureka_tl_blue(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P14, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P14, 0);
        }
      case eureka_tlp.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P16, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P16, 0);
        }
    }
  }
  //% color="#ffa800" weight=87 blockId=eureka_tl_yellow block="黄信号 点灯|%mode| |%pin|" group="2_信号機ユニット"
  export function eureka_tl_yellow(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P13, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P13, 0);
        }
      case eureka_tlp.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P15, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P15, 0);
        }
    }
  }
  //% color="#ff4940" weight=85 blockId=eureka_tl_red block="赤信号 点灯|%mode| |%pin|" group="2_信号機ユニット"
  export function eureka_tl_red(mode: onoff, pin: eureka_tlp) {
    switch (pin) {
      case eureka_tlp.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_tlp.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
    }
  }

  //% color="#1E90FF" weight=83 block="待ち時間（秒）|%second|" group="2_信号機ユニット"
  //% second.min=0 second.max=10
  export function driveForwards(second: number): void {
    basic.pause(second * 1000);
  }
  //% color="#009A00"  weight=80 block="光ｾﾝｻ値 |%limit| より暗い |%tlp|" group="3_電気の利用ユニット"
  //% limit.min=0 limit.max=100
  export function decideLight(limit: number, tlp: eureka_tlp): boolean {
    switch (tlp) {
      case eureka_tlp.Aﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P0) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_tlp.Bﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }
  //% color="#009A00"  weight=81 blockId=eureka_denkitemp block="光ｾﾝｻ値 |%pin|" group="3_電気の利用ユニット"
  export function eureka_denkitemp(pin: eureka_denki): number {
    switch (pin) {
      case eureka_denki.Aﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100);
      case eureka_denki.Bﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
    }
  }
  //% color="#009A00" weight=79 block="人が動いたら |%pin|" group="3_電気の利用ユニット"
  export function humanDetection(pin: eureka_p1416): boolean {
    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    switch (pin) {
      case eureka_p1416.Aﾎﾟｰﾄ:
        if (pins.digitalReadPin(DigitalPin.P14) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_p1416.Bﾎﾟｰﾄ:
        if (pins.digitalReadPin(DigitalPin.P16) == 1) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }

  //% color="#009A00"  weight=77 blockId=eureka_denkihuman block="人感ｾﾝｻ値 |%pin|" group="3_電気の利用ユニット"
  export function eureka_denkihuman(pin: eureka_denki): number {
    switch (pin) {
      case eureka_denki.Aﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P14);
      case eureka_denki.Bﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P16);
    }
  }

  //% color="#009A00"  weight=75 blockId=eureka_denkiwhite block="LED |%mode| |%pin|" group="3_電気の利用ユニット"
  export function eureka_denkiwhite(mode: onoff, port: eureka_denki) {
    switch (port) {
      case eureka_denki.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P13, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P13, 0);
        }
      case eureka_denki.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P15, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P15, 0);
        }
    }
  }
}
//% color="#74ad1d" block="単体ﾕﾆｯﾄ" 

namespace eureka_blocks_soro {

  //% color="#6041f1"  weight=60 blockId=eureka_L9110 block="ﾓｰﾀｰﾌｧﾝL |%mode| |%pin|" group="4_ユーレカ装置"
  //% mode.min=-100 mode.max=100
  export function L9110driver(port: eureka_denki, mode: number) {
    switch (port) {
      case eureka_denki.Aﾎﾟｰﾄ:
        if (mode > 0) {
          pins.analogWritePin(AnalogPin.P0, Math.round(mode * 10.23));
          pins.digitalWritePin(DigitalPin.P13, 0);
        }
        if (mode < 0) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.analogWritePin(AnalogPin.P13, Math.round(-mode * 10.23));
        }
        if (mode == 0) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
        }
        break;
      case eureka_denki.Bﾎﾟｰﾄ:
        if (mode > 0) {
          pins.analogWritePin(AnalogPin.P1, Math.round(mode * 10.23));
          pins.digitalWritePin(DigitalPin.P15, 0);
        }
        if (mode < 0) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.analogWritePin(AnalogPin.P15, Math.round(-mode * 10.23));
        }
        if (mode == 0) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 0);
        }
        break;
    }
  }

  //% color="#525252" weight=58 blockId=eureka_relay block="単体_ﾘﾚｰ(ﾃﾞｼﾞﾀﾙ) |%mode| |%pin|" group="4_ユーレカ装置"
  export function eureka_relay(mode: onoff, pin: eureka_IO) {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_IO.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
      case eureka_IO.Cﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P2, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P2, 0);
        }
    }
  }
  //% color="#525252" weight=56 blockId=eureka_relay_2 block="FETﾘﾚｰ(ｱﾅﾛｸﾞ出力) |%limit| |%syuturyoku|" group="4_ユーレカ装置"
  //% syuturyoku.min=0 syuturyoku.max=1023
  export function eureka_relay_2(syuturyoku: number, pin: eureka_IO) {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ: {
        return pins.analogWritePin(AnalogPin.P0, syuturyoku);
      }
      case eureka_IO.Bﾎﾟｰﾄ: {
        return pins.analogWritePin(AnalogPin.P1, syuturyoku);
      }
      case eureka_IO.Cﾎﾟｰﾄ: {
        return pins.analogWritePin(AnalogPin.P2, syuturyoku);
      }
    }
  }

  //% color="#40a6ff" weight=54 blockId=eureka_white block="単体_LED |%mode| |%pin|" group="4_ユーレカ装置"
  export function eureka_white(port: eureka_IO, mode: onoff) {
    switch (port) {
      case eureka_IO.Aﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P0, 0);
        }
      case eureka_IO.Bﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P1, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P1, 0);
        }
      case eureka_IO.Cﾎﾟｰﾄ:
        if (mode == onoff.ON) {
          return pins.digitalWritePin(DigitalPin.P2, 1);
        } else {
          return pins.digitalWritePin(DigitalPin.P2, 0);
        }
    }
  }

  //% color="#858585" weight=52 blockId=eureka_m_driver block="ﾓｰﾀｰﾄﾞﾗｲﾊﾞｰD 動き|%mode| |%pin|" group="4_ユーレカ装置"
  export function eureka_m_driver(mode: moter_d, pin: eureka_denki) {
    switch (pin) {
      case eureka_denki.Aﾎﾟｰﾄ:
        if (mode == moter_d.両方前) {
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 1);
        }
        if (mode == moter_d.両方後) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        if (mode == moter_d.Ｌだけ前) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 1);
        }
        if (mode == moter_d.Ｒだけ前) {
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        if (mode == moter_d.Ｌだけ後) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 1);
        }
        if (mode == moter_d.Ｒだけ後) {
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
        if (mode == moter_d.停止) {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
        }
      case eureka_denki.Bﾎﾟｰﾄ:
        if (mode == moter_d.両方前) {
          pins.digitalWritePin(DigitalPin.P1, 1);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 1);
        }
        if (mode == moter_d.両方後) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 1);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (mode == moter_d.Ｌだけ前) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 1);
        }
        if (mode == moter_d.Ｒだけ前) {
          pins.digitalWritePin(DigitalPin.P1, 1);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (mode == moter_d.Ｌだけ後) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 1);
          pins.digitalWritePin(DigitalPin.P16, 1);
        }
        if (mode == moter_d.Ｒだけ後) {
          pins.digitalWritePin(DigitalPin.P1, 1);
          pins.digitalWritePin(DigitalPin.P15, 1);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
        if (mode == moter_d.停止) {
          pins.digitalWritePin(DigitalPin.P1, 0);
          pins.digitalWritePin(DigitalPin.P15, 0);
          pins.digitalWritePin(DigitalPin.P16, 0);
        }
    }
  }

  //% color="#d4b41f"  weight=40 blockId=eureka_light block="単体_光ｾﾝｻ値 |%pin|" group="5_単体ユニットセンサー"
  export function tantai_light(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100);
      case eureka_IO.Bﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
      case eureka_IO.Cﾎﾟｰﾄ:
        return Math.round((pins.analogReadPin(AnalogPin.P2) / 1023) * 100);
    }
  }

  //% color="#d4b41f"  weight=38 block="単体_光ｾﾝｻ |%limit| より暗い |%pin|" group="5_単体ユニットセンサー"
  //% limit.min=0 limit.max=100
  export function tantai_Light(limit: number, pin: eureka_IO): boolean {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P0) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.Bﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.Cﾎﾟｰﾄ:
        if ((pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < limit) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }

  //% color="#858585" weight=36 block="単体_人が動いたら |%pin|" group="5_単体ユニットセンサー"
  export function tantai_humanDetection(pin: eureka_IO): boolean {
    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
    pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P0) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.Bﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P1) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case eureka_IO.Cﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P2) == 1) {
          return true;
        } else {
          return false;
        }
        break;
    }
  }
  //% color="#858585" weight=34 blockId=eureka_human block="単体_人感ｾﾝｻ値 |%pin|" group="5_単体ユニットセンサー"
  export function eureka_human(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P0);
      case eureka_IO.Bﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P1);
      case eureka_IO.Cﾎﾟｰﾄ:
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P2);
    }
  }
  //% color="#ff7b00" weight=32 blockId=eureka_temp block="温度ｾﾝｻMCP |%pin|" group="5_単体ユニットセンサー"
  export function eureka_temp(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        return Math.round(
          ((pins.analogReadPin(AnalogPin.P0) * 3250) / 1024 - 500) / 10
        );
      case eureka_IO.Bﾎﾟｰﾄ:
        return Math.round(
          ((pins.analogReadPin(AnalogPin.P1) * 3250) / 1024 - 500) / 10
        );
      case eureka_IO.Cﾎﾟｰﾄ:
        return Math.round(
          ((pins.analogReadPin(AnalogPin.P2) * 3250) / 1024 - 500) / 10
        );
    }
  }

  //% color="#2a2aba" weight=30 blockId=sonar_ping block="超音波きょりｾﾝｻ　|%pin| |%sonar_quality|" group="5_単体ユニットセンサー"
  export function ping(pin: eureka_tlp,sonar_quality:sonar_avg): number {
        if (sonar_quality　==sonar_avg.低速高精度){
            sonar_quality=20
        }
        if (sonar_quality==sonar_avg.中速中精度){
            sonar_quality=5
        }        
        if (sonar_quality==sonar_avg.高速低精度){
            sonar_quality=1
        }
    let  d1=0;
    let  d2=0;

    switch (pin) {


    case eureka_tlp.Aﾎﾟｰﾄ:
        for ( let i=0 ; i<sonar_quality ; i++ ){
            basic.pause(5);
            pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P13, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P13, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P13, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
            d2=d2+d1;
            }
            return Math.round(Math.idiv(d2/sonar_quality, 58)*1.5);
        break;

    case eureka_tlp.Bﾎﾟｰﾄ:
        for  ( let i=0 ; i<sonar_quality; i++){
        basic.pause(20);
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P15, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P15, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P15, 0);
        // read
        d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
        d2=d2+d1;
        }
        return Math.round(Math.idiv(d2/sonar_quality, 58)*1.5);
    }
  }

  //% color="#009A00" weight=28 blockId=sonar_ping_3 block="|%pin| |%sonar_quality| きょりが |%limit| cmより |%nagasa|" group="5_単体ユニットセンサー"
  //% limit.min=0 limit.max=50
  export function sonar_ping_3(pin:eureka_tlp,sonar_quality:sonar_avg,limit: number ,nagasa:kyori) :boolean {
        if (sonar_quality　==sonar_avg.低速高精度){
            sonar_quality=20;
        }
        if (sonar_quality==sonar_avg.中速中精度){
            sonar_quality=5;
        }        
        if (sonar_quality==sonar_avg.高速低精度){
            sonar_quality=1;
        }
    let  d1=0;
    let  d2=0;

    if (pin==eureka_tlp.Aﾎﾟｰﾄ){
        for ( let i=0 ; i<sonar_quality ; i++ ){
        // send
        basic.pause(5);
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P13, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P13, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P13, 0);
        // read
        d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
        d2= d1+d2;
        }
        switch(nagasa){
            case kyori.短い:
            if (Math.idiv(d2/sonar_quality, 58) * 1.5 < limit) {
            return true;
            } else {
            return false;
            }
            break;
            case kyori.長い:
            if (Math.idiv(d2/sonar_quality, 58) * 1.5 < limit) {
            return false;
            } else {
            return true;
            }
            break;
        }
    }
        if (pin==eureka_tlp.Bﾎﾟｰﾄ){
        for ( let i=0 ; i<sonar_quality ; i++ ){
        // send
        basic.pause(5);
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P15, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P15, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P15, 0);
        // read
        d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
        d2= d1+d2;
        }
        switch(nagasa){
            case kyori.短い:
            if (Math.idiv(d2/sonar_quality, 58) * 1.5 < limit) {
            return true;
            } else {
            return false;
            }
            break;
            case kyori.長い:
            if (Math.idiv(d2/sonar_quality, 58) * 1.5 < limit) {
            return false;
            } else {
            return true;
            }
            break;        
            }
        }
    }

  //% color="#f071bd" weight=26 blockId=eureka_CdS block="単体_ﾌｫﾄﾘﾌﾚｸﾀｰ |%pin|" group="5_単体ユニットセンサー"
  export function eureka_CdS(pin: eureka_IO): number {
    switch (pin) {
      case eureka_IO.Aﾎﾟｰﾄ:
        return (pins.analogReadPin(AnalogPin.P0) / 1023) * 100;
      case eureka_IO.Bﾎﾟｰﾄ:
        return (pins.analogReadPin(AnalogPin.P1) / 1023) * 100;
      case eureka_IO.Cﾎﾟｰﾄ:
        return (pins.analogReadPin(AnalogPin.P2) / 1023) * 100;
    }
  }

  //% shim=DS18B20::Temperature
  //% group="5_センサの値"
  export function Temperature(p: number): number {
    // Fake function for simulator
    return 0;
  }

  /*
    //% color="#ff7b00" weight=22 blockId="Temperature_string" 
    //% block="温度センサDS（文字返し） |%p|"
    //% p.fieldEditor="gridpicker" p.fieldOptions.columns=4
    //% group="5_単体ユニットセンサー"
    export function TemperatureString(p: eureka_IO): string {
        let temp = Temperature(p);
        let x = Math.round((temp / 100))
        let y = Math.round((temp % 100))
        let z = ''
        if (temp >= 0) {
            z = x.toString()
        }
        else if (temp < 0) {
            z = '-' + (-x).toString()
        }
        return z
    }
    */

  //% weight=33 blockId="Temperature_number"
  //% block="温度ｾﾝｻDS |%p|"
  //% p.fieldEditor="gridpicker" p.fieldOptions.columns=4
  //% group="5_単体ユニットセンサー"
  export function TemperatureNumber(p: eureka_IO): number {
    let temp = Temperature(p);
    let x = Math.round(temp / 100);
    return x;
  }
}

