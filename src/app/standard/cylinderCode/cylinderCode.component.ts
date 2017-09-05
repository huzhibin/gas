import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { CylinderCodeService } from './cylinderCode.service';
import 'rxjs/Rx' ;

@Component({
    templateUrl: 'cylinderCode.component.html',
    styleUrls: [],
    providers: [CylinderCodeService]
})
export class CylinderCodeComponent implements OnInit {
    
    
    CodeList: {
        example:string,
        type:string,
        administrativeRegion:string,
        company:string,
        station:string,
        cylinder:string,
        crc16:string,
       
    };//用户列表
    

    // // TODO:在提示消失的时候，将它从数组中清除
    alerts: any = [
    ];

    alertShift() {
        this.alerts.shift();
    }

    constructor(private CylinderCodeService: CylinderCodeService) { }

    getList() {
        let params=null ;
        // console.log('查询后台--getList:' + JSON.stringify(params));
        this.CylinderCodeService.getCylinderCodeList(params).then(data => {
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
        cylinder:'',
         crc16:'',
    }
}
    ngOnInit(): void { 
        this.initCode() ;
        this.getList();
    }
}

