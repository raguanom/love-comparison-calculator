import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CalculateService } from './services/calculate.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    loveCalculator = this.formBuilder.group({
        personOneName: '',
        personTwoName: ''
    });
    result: string = '';
    firstPersonName: string = '';
    secondPersonName: string = '';
    hideResult: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private calculateService: CalculateService) { }

    onSubmit() {
        let firstPerson = this.loveCalculator.get('personOneName')?.value.trim();
        let secondPerson = this.loveCalculator.get('personTwoName')?.value.trim();

        console.log(firstPerson);

        this.calculateService.getLoveScore(firstPerson, secondPerson).subscribe(data => {
            let res: any = data.body;
            this.result = res.result;
            this.firstPersonName = firstPerson;
            this.secondPersonName = secondPerson;
            this.hideResult = false;
        }, error => {
            console.log(error)
        });
    }

    clearResult(){
        this.hideResult = true;
        this.loveCalculator.reset();
    }

    keyPressAlphanumeric(event: any){
        let input = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z]/.test(input)){
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }
}
