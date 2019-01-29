    //dichiaro variabili globali
    var ctx;
    var myChart;
    var data1;
    var città;
    var labelAnno;
    var arraycittà;
    var arrayTD;
    var arrayTDfloat = [];
    var test2;
    var cittàEvent;
    var newcitta;

    //all'avvio della pagina carico il file JSON

    window.onload = function() {
        $.getJSON("https://api.myjson.com/bins/baa74", function(data) {

            data1 = data
            

            //prendo da data una chiave e un valore

            $.each(data, function(key, val) {



            città = val.citta[0]
            

        

            var anno = "<a class='dropdown-item' onclick = 'graphAnno(" + key + ",this)' href='#'>" + key + "</a>"

            var context = {dropdownAnni: anno};
            var html    = template(context);

            
            $(".dropdown-menu-anno").append(html);

       
           
            })

            // prendo le chiavi (ovvero in nomi delle città) dall'oggetto "città"

            arraycittà = Object.keys(città)
          

            // creo un ciclo per ottenere i nomi delle città da appendere nell'apposito dropdown

            for (var i=0; i < arraycittà.length; i++){

                var città1 = "<a class='dropdown-item' onclick = 'graphCitta(this)' href='#'>" + arraycittà[i] + "</a>"

                var context = {dropdownCittà: città1};
                var html    = template(context);

                
                $(".dropdown-menu-citta").append(html);
            
            }
           

        
        });
    }


         function graphAnno(anno, label1) {
        labelAnno = $(label1).text()
        $(".dropdown-toggle-anno").text(labelAnno)



        if (arrayTDfloat.length) {
            myChart.data.datasets[0].data = []
        }
        arrayTDfloat = []
        arrayTD = Object.values(data1[anno].citta[0])
        for (var i = 0; i < arrayTD.length; i++) {

            arrayTDfloat.push(parseFloat(arrayTD[i]))

        }
        

        
        if (myChart) myChart.destroy();

        // Genero il Grafico con myChart

        ctx = $("#myChart");
        Chart.defaults.global.defaultFontColor = '#3BBBBE';
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{

                    data: arrayTDfloat,

                        label: labelAnno,
                        fill: true,
                        backgroundColor: "#6C63FF",
                        lineTension: 0.1,
                        borderColor: "#3BBBBE",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#6C63FF",
                        pointBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 5,
                        pointHitRadius: 1,
                        

                }],
                labels: arraycittà,
                
            },
            
        });




    }

    var arrayAnni = []
    var arrayValoriCittà = []

    function graphCitta(cittàEvent) {

        

    arrayAnni = []
    arrayValoriCittà = []
    newcitta = $(cittàEvent).text()

    //navigo nell'array per prendere i valori delle citta

      
        for (var i = 2004; i < 2016; i++){

          arrayAnni.push(i)
          arrayValoriCittà.push(parseFloat(data1[i].citta[0][newcitta]))
          
        }


        if (myChart) myChart.destroy();


        ctx = $("#myChart");
        Chart.defaults.global.defaultFontColor = '#3BBBBE';
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{

                    data: arrayValoriCittà,

                        label: newcitta,
                        fill: true,
                        backgroundColor: "#6C63FF",
                        lineTension: 0.1,
                        borderColor: "#3BBBBE",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "#6C63FF",
                        pointBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 5,
                        pointHitRadius: 1,
                        

                }],
                labels: arrayAnni,
                
            },
           
        });


    }