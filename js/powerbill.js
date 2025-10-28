const getBill = e => {
    e.preventDefault();
    // money in units of dollars
    const monthlyKwh = parseFloat(document.getElementById('in1').value);
    const billPeriodDays = parseFloat(document.getElementById('in2').value);
    const isResidenceInsideCityLimits = document.getElementById('in3').checked;
    const isSummerMonth = document.getElementById('in4').checked;
    const salesTax = parseFloat(document.getElementById('in5').value);
    const winterRate = 0.062404;
    
    const baseCharge = 0.4603 * billPeriodDays;
    const tier1Base = isSummerMonth ? 0.066678 : winterRate;
    const tier1Kw = 650;
    const tier1 = monthlyKwh >= tier1Kw ? tier1Base * tier1Kw : tier1Base * monthlyKwh;
    const tier2Base = isSummerMonth ? 0.110748 : winterRate;
    const tier2Range = 350;
    const tier2Kw = tier1Kw + tier2Range;
    const tier2 = monthlyKwh > tier1Kw 
        ? 
            monthlyKwh <= tier2Kw 
                ? (monthlyKwh - tier1Kw) * tier2Base 
                : tier2Range * tier2Base
        : 0.0;
    const tier3Base = isSummerMonth ? 0.114625 : winterRate;
    const tier3 = monthlyKwh > tier2Kw ? (monthlyKwh - tier2Kw) * tier3Base : 0;

    const baseBillSubTotal = baseCharge + tier1 + tier2 + tier3;
    const fuelCostRider = isSummerMonth ? monthlyKwh * 0.045876 : monthlyKwh * 0.042859;
    const demandSideMgmtResidentialRider = baseBillSubTotal * 0.015989;
    const nuclearConstrCostRecRider = baseBillSubTotal * 0.041562;
    const environComplianceCostRecRider = baseBillSubTotal * 0.162813;
    const totalRevenue = baseBillSubTotal 
        + fuelCostRider 
        + demandSideMgmtResidentialRider 
        + nuclearConstrCostRecRider 
        + environComplianceCostRecRider;
    const franchiseFee = isResidenceInsideCityLimits 
        ? totalRevenue * 0.030674 : totalRevenue * 0.011839;
    const total = totalRevenue + franchiseFee;
    const totalPlusTax = total * (1 + salesTax / 100);

    if (totalPlusTax > 500.0) {
        // debugger;
        window.open('https://www.georgiapower.com/residential/save-money-and-energy/products-programs.html', '_blank');
    }
    
    const details = document.querySelector('.details').children;
    for (let i = 1; i <= 13; i++) {
        const currentElement = details[i].children[1].querySelector('p');
        switch (i) {
            case 1:
                currentElement.innerText = baseCharge.toFixed(2);
                break;
            case 2:
                currentElement.innerText = tier1.toFixed(2);
                break;
            case 3:
                currentElement.innerText = tier2.toFixed(2);
                break;
            case 4:
                currentElement.innerText = tier3.toFixed(2);
                break;
            case 5:
                currentElement.innerText = baseBillSubTotal.toFixed(2);
                break;
            case 6:
                currentElement.innerText = fuelCostRider.toFixed(2);
                break;
            case 7:
                currentElement.innerText = demandSideMgmtResidentialRider.toFixed(2);
                break;
            case 8:
                currentElement.innerText = nuclearConstrCostRecRider.toFixed(2);
                break;
            case 9:
                currentElement.innerText = environComplianceCostRecRider.toFixed(2);
                break;
            case 10:
                currentElement.innerText = totalRevenue.toFixed(2);
                break;
            case 11:
                currentElement.innerText = franchiseFee.toFixed(2);
                break;
            case 12:
                currentElement.innerText = total.toFixed(2);
                break;
            case 13:
                currentElement.innerText = totalPlusTax.toFixed(2);
                break;
            default:
                break;
        }
    }
};

document.getElementById('submit').addEventListener('click', getBill, false);
document.getElementById('back').addEventListener('click', () => window.location.assign("./index.html"), false);
