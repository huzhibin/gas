import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { StationCodeService } from './stationCode.service';
import 'rxjs/Rx' ;

@Component({
    templateUrl: 'stationCode.component.html',
    styleUrls: [],
    providers: [StationCodeService]
})
export class StationCodeComponent implements OnInit {
    
    
    CodeList: {
        example:string,
        type:string,
        administrativeRegion:string,
        company:string,
        station:string,
        crc16:string,
       
    };//用户列表
    

    // // TODO:在提示消失的时候，将它从数组中清除
    alerts: any = [
    ];

    alertShift() {
        this.alerts.shift();
    }

    constructor(private StationCodeService: StationCodeService) { }

    getList() {
        let params=null ;
        // console.log('查询后台--getList:' + JSON.stringify(params));
        this.StationCodeService.getStationCodeList(params).then(data => {
            if (data.status == 0) {
                this.CodeList = data.data;
             
            } else {
                this.alerts.push({
                    type: 'danger',
                    msg: data.msg,
                    timeout: 1000
                });
                return false;
            }

        }).catch(data => {
            this.alerts.push({
                type: 'danger',
                msg: '服务器出错了',
                timeout: 1000
            });
        });
    }
initCode(){
    this.CodeList={
        example:'' ,
         type:'',
        administrativeRegion:'',
        company:'',
        station:'',
         crc16:'',
    }
}
    ngOnInit(): void { 
        this.initCode() ;
        this.getList();
    }
}

