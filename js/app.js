const incomes = [new Income("salario", 2000), new Income("coche", 100)];

const discharges = [new Discharge("compra", 100), new Discharge("renta", 500)];

function ShowAll() {
  Update();
  ChargeIncomes();
  ChargeDischarges();
}

function Update() {
  let total = totalIncomes() - totalDischarges();
  //let percentIncomes = totalIncomes()/totalDischarges();
  let percentDischarges = totalDischarges()/totalIncomes();
  document.getElementById("budget").innerHTML = format(total);
  document.getElementById("incomes").innerHTML = format(totalIncomes());
  document.getElementById("discharges").innerHTML = format(totalDischarges());
  //document.getElementById("percentageIncomes").innerHTML = formatPercent(percentIncomes);
  document.getElementById("percentageDischarge").innerHTML = formatPercent(percentDischarges);
}

function totalIncomes() {
  let total = 0;
  for (let income of incomes) {
    total += income.value;
  }
  return total;
}

function totalDischarges() {
  let total = 0;
  for (let discharge of discharges) {
    total += discharge.value;
  }
  return total;
}

function format(value){
    return value.toLocaleString("en-US",{style:"currency", currency:"USD", minumuFrantionDigits:2});
}

function formatPercent(value){
    return value.toLocaleString("en-US",{style:"percent",minumuFrantionDigits:2});
}

function ChargeIncomes(){
    let incomesHTML="";
    for(let income of incomes){
        incomesHTML+=CreateIncome(income);
    }
    document.getElementById('lista-ingresos').innerHTML=incomesHTML;
}

function ChargeDischarges(){
    let DischargeHTML="";
    for(let discharge of discharges){
        DischargeHTML+=CreateDischarge(discharge);
    }
    document.getElementById('lista-egresos').innerHTML=DischargeHTML;
}

function CreateIncome(Income){
    let incomesHTML=`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${Income.description}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${format(Income.value)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn" onclick="DeleteIncome(${Income.id})">
                <ion-icon name="close-circle-outline"></ion-icon>
            </button>
        </div>
    </div> 
</div>`;
    return incomesHTML
}

function CreateDischarge(Discharge){
    let DischargeHTML=`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${Discharge.description}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">-${format(Discharge.value)}</div>
        <div class="elemento_porcentaje">${formatPercent(Discharge.value/totalDischarges())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn" onclick="DeleteDischarge(${Discharge.id})">
                <ion-icon name="close-circle-outline"></ion-icon>
            </button>
        </div>
    </div> 
</div>`;
    return DischargeHTML
}

function DeleteDischarge(id){
    let elim = discharges.findIndex(discharge => discharge.id===id);
    discharges.splice(elim,1);
    Update();
    ChargeDischarges();
}

function DeleteIncome(id){
    let elim = incomes.findIndex(income => income.id===id);
    incomes.splice(elim,1);
    Update();
    ChargeIncomes();
}

function AddData(){
    const form=document.getElementById("forma");
    let description= form["description"];
    let values= form["value"];
    if(description!="" && !(isNaN(parseFloat(values.value)))){
        const selected=document.getElementById("tipo");
        if(selected.value=="income")
            incomes.push(new Income(description.value, parseFloat(values.value)));
        else if(selected.value=="discharge")
            discharges.push(new Discharge(description.value, parseFloat(values.value)));
    }
    ShowAll();    
}
