import { TestBed, inject } from '@angular/core/testing';

import { BasicLayoutComponent } from './basic-layout.component';

describe('a basic-layout component', () => {
	let component: BasicLayoutComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BasicLayoutComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BasicLayoutComponent], (BasicLayoutComponent) => {
		component = BasicLayoutComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});