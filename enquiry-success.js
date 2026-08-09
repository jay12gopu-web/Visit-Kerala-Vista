(() => {
    const initialise = () => {
    const page = document.querySelector('[data-enquiry-success]');
    if (!page) return;

    const title = document.getElementById('enquiry-success-title');
    const kicker = document.getElementById('enquiry-success-kicker');
    const message = document.getElementById('enquiry-success-message');
    const confirmed = new URLSearchParams(window.location.search).get('submitted') === '1';

    document.querySelectorAll('[data-confirmed-only]').forEach((element) => {
        element.hidden = !confirmed;
    });

    document.querySelectorAll('[data-unconfirmed-only]').forEach((element) => {
        element.hidden = confirmed;
    });

    page.classList.toggle('is-confirmed', confirmed);
    page.classList.toggle('is-unconfirmed', !confirmed);

    if (!confirmed) {
        document.title = 'Enquiry Status | Visit Kerala';
        kicker.textContent = 'Enquiry Status';
        title.textContent = 'No confirmed enquiry found';
        message.textContent = 'Open this page after successfully submitting the Visit Kerala trip-enquiry form.';
        return;
    }

    document.title = 'Enquiry Sent | Visit Kerala';
    kicker.textContent = 'Journey Confirmed';
    title.textContent = 'Enquiry Sent!';
    message.textContent = 'Your Kerala plans are one step closer.';
    sessionStorage.removeItem('visitKeralaSelectedEstimate');
    sessionStorage.removeItem('visitKeralaEnquiryPending');
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise);
    else initialise();
})();
