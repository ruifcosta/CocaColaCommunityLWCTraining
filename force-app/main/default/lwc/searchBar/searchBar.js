import { LightningElement } from 'lwc';

export default class SearchBar extends LightningElement {

    value = "nosort";
    searchTerm = "";
    
    get options() {
        return [
            { label: 'None', value: "nosort" },
            { label: 'Name', value: "namesorted" }
        ];
    }

    handleChange(event) {
        this.value = event.target.value;
        const sortEvent = new CustomEvent('sortchange', { detail: this.value, bubbles: true, composed: false });

        // Dispatches the event.
        this.dispatchEvent(sortEvent);

    }

    handleSearchTermChange(event) {

		this.searchTerm = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {

            const selectedEvent = new CustomEvent('searchchange', { detail: this.searchTerm,
                bubbles: true , composed:true
            });

            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
		}, 300);

        
	}
}