"use strict";

/*---- Funções Auxiliares ----*/

// Funções Auxiliares – Validações

export const oAssert = function( expressions, message = "Assertion failed.", errorType = Error ) // Retorna um erro se uma das expressões passadas retornar um valor falso
  { oAssertType( { string: message } );
    if( errorType != Error && ( !errorType[ "prototype" ] || !( errorType[ "prototype" ] instanceof Error ) ) ) throw new TypeError( "Invalid Error object passed." );
    let expressionsList = Array.oMake( expressions );
    for( let expression of expressionsList ) if( !expression ) throw new errorType( message );
    return true }

export const oAssertConstructor = function( constructorMap, direct = false ) // Retorna um erro se um dos alvos passados não for uma instância do construtor em suas chaves
  { for( let constructorString in constructorMap )
      { let valuesList = Array.oMake( constructorMap[ constructorString ] ),
            _constructor = eval( constructorString );
        for( let value of valuesList )
          { if( direct && value.constructor != _constructor ) throw new TypeError( `Direct constructor of value ${ value } is ${ value.constructor.name }, but it was expected it to be ${ constructorString }.` )
            else if( !( value instanceof _constructor ) ) throw new TypeError( `Value ${ value } is not an instance of ${ constructorString }.` ) } }
    return true }

export const oAssertType = function( typeMap ) // Retorna um erro se o tipo de um dos alvos passados não corresponder com o em suas chaves
  { for( let type in typeMap )
      { let valuesList = Array.oMake( typeMap[ type ] );
        for( let value of valuesList )
          { if( typeof value != type ) throw new TypeError( `Type of value ${ value } is ${ typeof value }, but it was expected it to be ${ type }.` ) } }
    return true }

// Funções Auxiliares – Outros

export const oBlockEvent = function( event ) // Bloqueia a propagação de dado evento
  { event.stopPropagation() }

/* Strings */

// String – Protótipo

upperAndLowerChars:
  { Object.defineProperties( String,
      { oUpperChars: { value: [], enumerable: true }, oLowerChars: { value: [], enumerable: true } } );
    let charsMap = { oUpperChars: 65, oLowerChars: 97 };
    for( let chars in charsMap )
      { for( let i = charsMap[ chars ], range = charsMap[ chars ] + 25; i < range; i++ )
        { String[ chars ].push( String.fromCharCode( i ) ) } } }

numbers:
  { Object.defineProperty( String, "oNumbers", { value: [], enumerable: true } );
    for( let i = 48; i < 58; i++ ) String.oNumbers.push( String.fromCharCode( i ) ) }

Object.defineProperties( String.prototype,
  { oCount: // Retorna íntegros com a quantidade discreta dos caracteres passados que o alvo possui
      { value: function oCount( charList )
          { let charArray = Array.oMake( charList ), amount = [];
            for( let char of charArray )
              { let counter = 0;
                for( let i = 0; i < this.length; i++ ) if( this[ i ] == char ) counter++;
                amount.push( counter ) }
            return amount.length == 1 ? amount.pop() : amout },
        enumerable: true },
    oFindFirstChar: // Retorna o primeiro caractere de dado arranjo encontrado no alvo, ou o primeiro que não seja deste dado arranjo
      { value: function oFindFirstChar( charset, exclusive = false )
          { if( !Array.isArray( charset ) ) throw new TypeError( "The charset argument of oFindFirstChar must be an array." );
            if( charset.some( char => typeof char !== "string" ) ) throw new TypeError( "The values of charset array must be all strings." );
            if( typeof exclusive !== "boolean" ) throw new TypeError( "The exclusive argument of oFindFirstChar must be a boolean." );
            let actualChar = this.charAt( 0 ), includeExpression = exclusive ? "charset.includes( actualChar )" : "!charset.includes( actualChar )";
            for( let i = 1; actualChar && eval( includeExpression ); i++ ) actualChar = this.charAt( i );
            return actualChar },
        enumerable: true },
    oFindFirstIndex: // Retorna o número de índice do primeiro caractere de dado arranjo encontrado no alvo, ou do primeiro que não seja deste dado arranjo
      { value: function oFindFirstIndex( charset, exclusive = false )
          { let targetChar = this.oFindFirstChar( charset, exclusive );
            return targetChar ? this.indexOf( targetChar ) : -1 },
        enumerable: true },
    oInsertExcerpt: // Inseri dado excerto em dado ponto do alvo
      { value: function oInsertExcerpt( string, start, reverse = false )
          { if( typeof string !== "string" || typeof start !== "string" ) throw new TypeError( "The arguments 'string' and 'start' of oInsertExcerpt must be strings." );
            if( typeof reverse !== "boolean" ) throw new TypeError( "The argument 'reverse' of oInsertExcerpt must be a boolean." );
            if( !this.includes( start ) ) return false;
            let indexMethod = reverse ? "lastIndexOf" : "indexOf";
            return this.slice( 0, this[ indexMethod ]( start ) + start.length ) + string + this.slice( this[ indexMethod ]( start ) + start.length ) },
        enumerable: true },
    oBringExcerpt: // Retorna o trecho contido no alvo entre demarcadores de início e fim
      { value: function oBringExcerpt( start, end = "", exclusive = false )
          { if( typeof start !== "string" || typeof end !== "string" ) throw  new TypeError( "The arguments 'start' and 'end' of oBringExcerpt must be strings." );
            if( typeof exclusive !== "boolean" ) throw new TypeError( "The exclusive argument of oBringExcerpt must be a boolean." );
            let excerpt = this.slice( this.indexOf( start ) );
            excerpt = excerpt.slice( 0, excerpt.indexOf( end ) || excerpt.length );
            return exclusive ? excerpt.slice( start.length ) : excerpt },
        enumerable: true },
    oRemoveExcerpt: // Remove dado excerto do alvo
      { value: function oRemoveExcerpt( start, end = "", reverse = false )
          { if( typeof start !== "string" || typeof end !== "string" ) throw new TypeError( "The arguments 'start' and 'end' of oRemoveExcerpt must be strings." );
            if( typeof reverse !== "boolean" ) throw new TypeError( "The argument 'reverse' of oRemoveExcerpt must be a boolean." );
            if( !this.includes( start ) || ( end && !this.includes( end ) ) ) return false;
            let indexMethod = reverse ? "lastIndexOf" : "indexOf";
            return this.slice( 0, this[ indexMethod ]( start ) ) + this.slice( this[ indexMethod ]( end ) + end.length ) },
        enumerable: true },
    oReplaceExcerpt: // Substitui dado excerto do alvo por outro
      { value: function oReplaceExcerpt( string, target, reverse = false )
          { if( typeof string !== "string" || typeof target !== "string" ) throw new TypeError( "The arguments 'string' and 'target' of oReplaceExcerpt must be strings." );
            if( typeof reverse !== "boolean" ) throw new TypeError( "The argument 'reverse' of oReplaceExcerpt must be a boolean." );
            if( !this.includes( target ) ) return false;
            let indexMethod = reverse ? "lastIndexOf" : "indexOf";
            return this.slice( 0, this[ indexMethod ]( target ) ) + string + this.slice( this[ indexMethod ]( target ) + target.length ) },
        enumerable: true },
    oInvert: // Retorna dada string com o conteúdo do alvo, se esta o conter, excluído
      { value: function oInvert( string, reverse = false )
          { if( typeof string !== "string" ) throw new TypeError( "The argument string of oInvert must be a string." );
            if( typeof reverse !== "boolean" ) throw new TypeError( "The argument reverse of oInvert must be a boolean." );
            if( !string.includes( this ) ) return "";
            return reverse ?
              string.slice( 0, string.lastIndexOf( this ) ) + string.slice( string.lastIndexOf( this ) + this.length ) :
              string.replace( this, "" ) },
        enumerable: true },
    oRemoveChars: // Remove determinados caracteres do alvo
      { value: function oRemoveChars( charList, count = Infinity, reverse = false )
          { if( typeof count !== "number" ) throw new TypeError( "The argument count of oRemoveChars must be a number." );
            if( count < 0 ) throw new RangeError( "The argument count of oRemoveChars must be greater than or equal 0." );
            if( typeof reverse !== "boolean" ) throw new TypeError( "The argument reverse of oRemoveChars must be a boolean." );
            let charArray = Array.oMake( charList ), newString = this;
            for( let char of charArray )
              { for( let i = 0; i < count; i++ )
                  { if( !newString.includes( char ) ) break;
                    newString = reverse ?
                      newString.slice( 0, newString.lastIndexOf( char ) ) + newString.slice( newString.lastIndexOf( char ) + 1 ) :
                      newString.replace( char, "" ) } }
            return newString },
        enumerable: true },
    oRemoveRepeatedChars: // Remove determinada quantidade de caracteres repetidos em dado alvo
      { value: function oRemoveRepeatedChars( charList, spare = 1, reverse = false )
          { if( typeof spare !== "number" ) throw new TypeError( "The argument spare of oRemoveRepeatedChars must be a number." );
            if( spare < 0 ) throw new RangeError( "The argument spare of oRemoveRepeatedChars must be greater or equal to 0." );
            if( typeof reverse !== "boolean" ) throw new TypeError( "The argument reverse of oRemoveChars must be a boolean." );
            if( spare == 0 ) return oRemoveChars( charList );
            let charArray = Array.oMake( charList ), fullString = this;
            for( let char of charArray )
              { if( !fullString.includes( char ) ) continue;
                let sparedExcerpt = reverse ? fullString.slice( 0, fullString.indexOf( char ) + char.length ) : fullString.slice( fullString.lastIndexOf( char ) ),
                    stringPart = reverse ? sparedExcerpt.oInvert( fullString ) : sparedExcerpt.oInvert( fullString, true );
                while( stringPart.includes( char ) && spare != sparedExcerpt.oCount( char ) )
                  { sparedExcerpt = reverse ?
                      sparedExcerpt + stringPart.slice( 0, stringPart.indexOf( char ) + char.length ) :
                      stringPart.slice( stringPart.lastIndexOf( char ) ) + sparedExcerpt;
                    stringPart = reverse ? sparedExcerpt.oInvert( fullString ) : sparedExcerpt.oInvert( fullString, true ) }
                stringPart = stringPart.oRemoveChars( char );
                fullString = reverse ? sparedExcerpt + stringPart : stringPart + sparedExcerpt }
            return fullString },
        enumerable: true },
    oRemoveAdjacentChars: // Remove de dado caractere outros caracteres lhe adjacentes
      { value: function oRemoveAdjacentChars( charMap, direction = "both" )
          { if( typeof charMap !== "object" ) throw new TypeError( "The argument 'charMap' of oRemoveAdjacentChars must be an object, with the chars from which adjacents ones will be removed as keys, and with the chars to remove as values." );
            if( typeof direction !== "string" ) throw new TypeError( "The argument 'direction' of oRemoveAdjacentChars must be a string." );
            if( ![ "both", "left", "right" ].includes( direction ) ) throw new RangeError( "The value of 'direction', in oRemoveAdjacentChars, must be either 'both', 'left' or 'right'." );
            let newString = this, revalue = false;
            for( let baseChar in charMap )
              { let charList = Array.oMake( charMap[ baseChar ] );
                for( let charToRemove of charList )
                  { if( typeof charToRemove !== "string" ) throw new TypeError( "The array values of 'charMap', in function oRemoveAdjacentChars, must be all strings." );
                    if( direction == "both" || direction == "left" )
                      { let targetString = charToRemove + baseChar;
                        if( newString.includes( targetString ) ) revalue = true;
                        while( newString.includes( targetString ) ) newString = removeChar( newString, targetString ) }
                    if( direction == "both" || direction == "right" )
                      { let targetString = baseChar + charToRemove;
                        if( newString.includes( targetString ) ) revalue = true;
                        while( newString.includes( targetString ) ) newString = removeChar( newString, targetString ) }
                    function removeChar( newString, targetString )
                      { return newString.slice( 0, newString.indexOf( targetString ) ) + newString.oBringExcerpt( targetString ).replace( charToRemove, "" ) } } }
            return revalue ? newString.oRemoveAdjacentChars( charMap, direction ) : newString },
        enumerable: true },
    oRemoveRepeatedAdjacentChars:
      { value: function oRemoveRepeatedAdjacentChars( targetChars )
          { let charList = Array.oMake( targetChars ), charMap = { };
            for( let char of charList ) if( char ) charMap[ char ] = char;
            return this.oRemoveAdjacentChars( charMap ) },
        enumerable: true },
    oFilterNumber: // Retorna o primeiro número ou agrupamento numérico do alvo
      { value: function oFilterNumber( decimalSeparator = ".", overlookedChars = [] )
          { if( typeof decimalSeparator !== "string" ) throw new TypeError( "The argument decimalSeparator of oFilterNumber must be a string." );
            if( !Array.isArray( overlookedChars ) ) throw new TypeError( "The argument overlookedChars of oFilterNumber must be an array." );
            if( overlookedChars.includes( decimalSeparator ) || overlookedChars.some( char => String.oNumbers.includes( char ) ) ) throw new RangeError( "The argument overlookedChars of oFilterNumber must not include the decimalSeparator value, or numeric values." );
            if( overlookedChars.some( char => typeof char !== "string" ) ) throw new TypeError( "The values of overlookedChars array must be all strings." );
            if( !String.oNumbers.some( number => this.includes( number ) ) ) return "";
            let numberSet = String.oNumbers.concat( decimalSeparator || [] ), totalSet = numberSet.concat( overlookedChars ),
                numericExcerpt = this.slice( this.oFindFirstIndex( numberSet ) );
            while( numericExcerpt[0] == decimalSeparator && !String.oNumbers.includes( numericExcerpt[1] ) )
              { numericExcerpt = numericExcerpt.slice( numericExcerpt.slice( 1 ).oFindFirstIndex( numberSet ) + 1 ) }
            if( !numericExcerpt.split("").every( char => numberSet.includes( char ) ) ) numericExcerpt = numericExcerpt.slice( 0, numericExcerpt.oFindFirstIndex( totalSet, true ) );
            for( let char of overlookedChars )
              { while( numericExcerpt.includes( char ) ) numericExcerpt = numericExcerpt.replace( char, "" ) }
            filterAdditionalSeparators:
              { let separatorIndex = numericExcerpt.indexOf( decimalSeparator );
                while( decimalSeparator && separatorIndex != numericExcerpt.lastIndexOf( decimalSeparator ) )
                  { numericExcerpt = numericExcerpt.slice( 0, separatorIndex + 1 ) + numericExcerpt.slice( separatorIndex + 1 ).replace( decimalSeparator, "" ) } }
            numericExcerpt = numericExcerpt.replace( decimalSeparator, "." );
            return Number( numericExcerpt ) },
        enumerable: true } } );

/*---- Números ----*/

// Números – Protótipo

Object.defineProperties( Number.prototype,
  { oClosestIntegerMultiple: // Retorna íntegro mais próximo ao alvo que lhe seja múltiplo
      { value: function oClosestIntegerMultiple()
          { oAssert( !Number.isNaN( this ), "NaN is not a valid target for 'oClosestIntegerMultiple'.", RangeError );
            let currentValue = this;
            while( !Number.isInteger( currentValue ) ) currentValue += this;
            return currentValue },
        enumerable: true },
    oSegment: // Retorna arranjo com tamanho igual ao número de segmentos passados, e valores rateados entre o do inset e o do alvo
      { value: function oSegment( segments, inset = 0, round = false )
          { oAssertType( { number: [ segments, inset ] } );
            oAssert( !Number.isNaN( segments ) && !Number.isNaN( inset ), "NaN is not a valid argument for 'oSegment'.", RangeError );
            oAssert( this > inset, "Argument 'inset' cannot be greater or equal to the target of 'oSegment'.", RangeError );
            let segmentedValues = [ inset, this ], innerMultiple = ( this - inset ) / ( segments - 1 );
            if( round ) innerMultiple = Math.round( innerMultiple );
            for( let i = 1; i <= segments - 2; i++ ) segmentedValues.splice( i, 0, inset + innerMultiple * i );
            return segmentedValues },
        enumerable: true } } );

/*---- Arranjos ----*/

// Arranjos – Construtor

Object.defineProperties( Array,
  { oMake: // Converte valores quaisquer em arranjos
      { value: function oMake( target, shallow = true )
          { let array =
              target instanceof Object && !( target instanceof String || target instanceof EventTarget ) && typeof target[ Symbol.iterator ] == "function" ?
                Array.from( target ) : Array.of( target );
            return shallow ? array.slice() : array },
        enumerable: true } } );

// Arranjos – Protótipo

Object.defineProperties( Array.prototype,
  { oCycle: // Quando o número do argumento for negativo ou maior que o tamanho de um arranjo, ajusta aquele de modo a retornar o valor do arranjo que corresponder ao novo valor do número
      { value: function oCycle( integer )
          { oAssertType( { number: integer } );
            if( integer >= this.length ) integer %= this.length
            else while( integer < 0 ) integer += this.length;
            return this[ integer ] },
        enumerable: true },
    oSegment: // Divide o arranjo em sub-arranjos, a começarem com o valor para o qual a função passada retornar um valor verdadeiro
      { value: function oSegment( evaluer, trim = false )
          { let newArray = [], startIndex = 0;
            this.forEach( ( value, index, array ) =>
              { if( index && evaluer( value, index, array ) ) { newArray.push( array.slice( startIndex, index ) ); startIndex = index } } );
            newArray.push( this.slice( startIndex ) );
            if( trim && !evaluer( newArray[0][0] ) ) newArray.shift();
            return newArray },
        enumerable: true },
    oSegmentByEnd: // Divide o arranjo em sub-arranjos, a terminarem com o valor para o qual a função passada retornar um valor verdadeiro
      { value: function oSegmentByEnd( evaluer, trim = false )
          { let newArray = [], startIndex = 0;
            this.forEach( ( value, index, array ) =>
              { if( evaluer( value, index, array ) ) { newArray.push( array.slice( startIndex, index + 1 ) ); startIndex = index + 1 } } );
            if( !trim && startIndex != this.length ) newArray.push( this.slice( startIndex ) );
            return newArray },
        enumerable: true },
    oShuffle: // Retorna novo arranjo com posição dos valores do arranjo original em distribuição aleatória
      { value: function oShuffle()
          { let baseArray = this.slice(), newArray = [];
            while( baseArray.length ) newArray.push( baseArray.splice( Math.oRandom( 0, baseArray.length - 1, true ), 1 ).pop() );
            return newArray },
        enumerable: true },
    oTrim: // Elimina valores de um arranjo até o primeiro que atenda à avaliação da função de parâmetro
      { value: function oTrim( evaluer )
          { return this.slice( this.findIndex( value => evaluer( value ) ) || this.length ) },
        enumerable: true },
    oUniquify: // Elimina valores repetidos do arranjo
      { value: function oUniquify()
          { return this.filter( ( value, index, array ) => array.indexOf( value ) == index ) },
        enumerable: true } } );

/*---- Math ----*/

Object.defineProperties( Math,
  { oRandom: // Gera valor aleatório entre o mínimo e máximo passado, de modo inclusivo para ambos
      { value: function oRandom( min, max, integer = false )
          { let maxBleeding = integer ? max + 1 : max + 10 ** -15;
            let randomNumber = Math.random() * ( maxBleeding - min ) + min;
            return integer || max < randomNumber ? Math.trunc( randomNumber ) : randomNumber },
        enumerable: true } } );

/*---- Alvos de Eventos ----*/

// Alvos de Eventos – Protótipo

Object.defineProperties( EventTarget.prototype,
  { oAssignEvents: // Define valores de propriedades de eventos
      { value: function oAssignEvents( eventsMap )
          { for( let _event in eventsMap )
              { let key = "on" + _event, action = eventsMap[ _event ];
                oAssert( key in this, `${ key } is not a valid key of ${ this }.`, RangeError );
                oAssertType( { function: action } );
                this[ key ] = action }
            return true },
        enumerable: true } } );

/*---- Janela ----*/

// Janela

Object.defineProperties( window,
  { oSpreadAction: // Espaceia execução de função em intervalos regulares durante seu período de execução
      { value: function oSpreadAction( action, period, ticks = 2 )
          { oAssertType( { function: action, number: [ period, ticks ] } );
            let actionTimestamp = period.oSegment( ticks ),
                actionInterval = window.setInterval( action, actionTimestamp[1] );
            window.setTimeout( () => window.clearInterval( actionInterval ), period )
            return action() },
        enumerable: true } } );

// Janela – Console

Object.defineProperties( window.console,
  { oContrastPerformance: // Lista comparação de tempo gasto entre funções de um grupo, executadas por dado número de vezes
      { value: function oContrastPerformance( functionsMap, divisor = 0 )
          { let measurementsSet = performance.oEvaluePerformance( functionsMap ).oSegmentByEnd( ( measure, index, array ) =>
                  measure.timesCounter != array.oCycle( index + 1 ).timesCounter ),
                logString = "", count = 0, timeUnit;
            if( measurementsSet.some( timesCounterSet => timesCounterSet.length < 2 ) )
              { console.warn( "Keys with only one function were ignored during 'oContrastPerformance' evaluation." );
                measurementsSet = measurementsSet.filter( timesCounterSet => timesCounterSet.length >= 2 ) }
            switch( divisor )
              { case 0: timeUnit = "ms"; break;
                case 1: timeUnit = "cs"; break;
                case 2: timeUnit = "ds"; break;
                case 3: timeUnit = "s"; break;
                default: throw new RangeError( "Argument 'divisor' of 'oContrastPerformance' must be a number between 0 and 3." ) }
            for( let timesCounterSet of measurementsSet )
              { timesCounterSet.sort( ( a, b ) => a.duration - b.duration );
                for( let measurement of timesCounterSet )
                  { if( measurement == timesCounterSet[0] ) { logString += `${ ++count }. ${ measurement.name } is:\n    `; continue }
                    logString += `${ ( measurement.duration - timesCounterSet[0].duration ) / 10 ** divisor }${ timeUnit } faster than ${ measurement.name }`;
                    logString += measurement == timesCounterSet.oCycle( -1 ) ? `. (Functions executed ${ measurement.timesCounter } times)${ "\n".repeat( 2 ) }` : ", " } }
            console.log( logString.trimEnd() ) },
        enumerable: true },
    oListLog: // Inseri em linhas separadas valores de variáveis no console
      { value: function oListLog()
          { oAssertType( { string: arguments } );
            let logString = "", lastExpression = arguments[ arguments.length - 1 ];
            for( let expression of arguments )
              { logString += `${ expression }: ${ eval( expression ) }`;
                if( expression != lastExpression ) logString += "\n" }
            console.log( logString ) },
        enumerable: true },
    oListPerformance: // Lista tempo total gasto com cada função passada enquanto executadas por dado número de vezes
      { value: function oListPerformance( functionsMap, divisor = 0 )
          { oAssertType( { number: divisor } );
            let measurementsSet = performance.oEvaluePerformance( functionsMap ),
                logString = "", count = 0;
            for( let measurement of measurementsSet )
              { logString += `${ ++count }. ${ measurement.name }: ${ measurement.duration / 10 ** divisor } (Executed ${ measurement.timesCounter } times)\n` }
            console.log( logString.trimEnd() ) },
        enumerable: true } } );

/*---- Performance ----*/

// Performance – Protótipo

Object.defineProperties( Performance.prototype,
  { oEvaluePerformance: // Aferi tempo levado na execução de funções por dado número de vezes
      { value: function oEvaluePerformance( functionsMap )
          { oAssertType( { object: functionsMap } );
            let measurementsSet = [];
            for( let timesCounter in functionsMap )
              { oAssert( !Object.is( +timesCounter, NaN ), "NaN is not a valid key for argument 'functionsMap'.", RangeError );
                oAssert( timesCounter > 0, "The keys of argument 'functionsMap' must be greater than 0.", RangeError );
                let functionsList = Array.oMake( functionsMap[ timesCounter ] );
                oAssertType( { function: functionsList } );
                for( let _function of functionsList )
                  { let startMark = _function.name + "Start", endMark = _function.name + "End", measurement = _function.name;
                    performance.mark( startMark );
                    for( let i = 0; i < timesCounter; i++ ) _function();
                    performance.mark( endMark );
                    performance.measure( measurement, startMark, endMark );
                    let actualMeasurement = performance.getEntriesByName( measurement ).oCycle( -1 );
                    actualMeasurement.timesCounter = timesCounter; measurementsSet.push( actualMeasurement );
                    for( let mark of [ startMark, endMark ] ) performance.clearMarks( mark ) } }
            return measurementsSet },
        enumerable: true } } );

/*---- Nós ----*/

// Nós – Protótipo

Object.defineProperties( Node.prototype,
  { oChangeBySize: // Retorna uma função ou boolean segundo o tamanho de dado objeto
      { value: function oChangeBySize( media, truthFunction, falsyFunction, evaluedNode )
          { let targetComponent, sizeID,
                allowedMediaKeys = [ [ "innerWidth", "innerHeight", "outerWidth", "outerHeight" ],
                                     [ "width", "height", "availWidth", "availHeight" ],
                                     [ "clientWidth", "clientHeight", "offsetWidth", "offsetHeight", "scrollWidth", "scrollHeight" ] ];
            for( let size in media )
              { oAssertType( { number: media[ size ] } );
                for( let i = 0; i < allowedMediaKeys.length; i++ )
                  { if( allowedMediaKeys[i].includes( size ) ) { sizeID = i; break } }
                switch( sizeID )
                  { case 0: targetComponent = window; break;
                    case 1: targetComponent = window.screen; break;
                    case 2: targetComponent = evaluedNode || this; break;
                    default: throw new RangeError( "Argument 'media' keys must be a size property of window, screen or Element." ) }
                if( targetComponent[ size ] > media[ size ] ) return falsyFunction ? falsyFunction() : false }
            return truthFunction ? truthFunction() : true },
        enumerable: true },
    oChangePlacementBySize: // Inseri alvo em recipiente segundo o tamanho de dado objeto
      { value: function oChangePlacementBySize( media, receiver, nextSibling, evaluedNode )
          { let originalParent = this.originalParent = this.originalParent || this.parentElement,
                originalSibling = this.originalSibling = this.originalSibling || this.nextElementSibling || "none";
            if( this.oChangeBySize( media, false, false, evaluedNode || receiver ) )
              { if( !Array.from( receiver.children ).includes( this ) ) nextSibling ? receiver.insertBefore( this, nextSibling ) : receiver.appendChild( this ) }
            else
              { if( Array.from( receiver.children ).includes( this ) )
                  { originalSibling != "none" && Array.from( originalParent.children ).includes( originalSibling ) ?
                      originalParent.insertBefore( this, originalSibling ) : originalParent.appendChild( this ) } } },
        enumerable: true } } );

/*---- Elementos ----*/

// Elementos – Protótipo

Object.defineProperties( Element.prototype,
  { oBringChildren: // Retorna um arranjo com os elementos do primeiro argumento descendentes do alvo, opcionalmente delimitados por quantidade e alcance
      { value: function oBringChildren( elementsList = this.querySelectorAll( "*" ), count = Infinity, range = Infinity )
          { oAssertType( { number: [ count, range ] } );
            let actualChildren = this.children, targetChildren = [];
            if( !actualChildren.length || count <= 0 || range <= 0 ) return [];
            let arrayList = new oElementsArray( elementsList );
            childrenLoop: for( let child of actualChildren )
              { while( arrayList.includes( child ) )
                  { targetChildren = targetChildren.concat( arrayList.splice( arrayList.findIndex( element => element.isSameNode( child ) ), 1 ) );
                    if( targetChildren.length == count ) break childrenLoop }
                if( range > 1 && arrayList.length ) targetChildren = targetChildren.concat( child.oBringChildren( arrayList, count - targetChildren.length, range - 1 ) || [] );
                if( targetChildren.length == count ) break }
            return count == 1 ? targetChildren.pop() : targetChildren },
        enumerable: true },
    oBringParentsChain: // Retorna arranjo com os elementos ascendentes do alvo, do mais próximo ao mais distante
      { value: function oBringParentChain( baseElement = document.documentElement )
          { oAssertConstructor( { Element: baseElement } );
            let depth = this.oFindDepth( baseElement ), parentsList = [];
            for( let actualParent = this.parentElement, i = 0; i < depth; actualParent = actualParent.parentElement, i++ ) parentsList.push( actualParent );
            return parentsList },
        enumerable: true },
    oBringParents: // Retorna um arranjo com os elementos do primeiro argumento ascendentes do alvo, opcionalmente delimitados por quantidade e alcance
      { value: function oBringParents( elementsList = this.oBringParentsChain(), count = Infinity, range = Infinity )
          { oAssertType( { number: [ count, range ] } );
            let actualParent = this.parentElement, targetParents = [];
            if( count <= 0 ) return [];
            if( range < 0 ) if( ( range = this.oFindDepth() + range ) < 0 ) return count == 1 ? false : [];
            let arrayList = new oElementsArray( elementsList );
            parentsLoop: while( actualParent && arrayList.length && range )
              { while( arrayList.includes( actualParent ) )
                  { targetParents = targetParents.concat( arrayList.splice( arrayList.findIndex( element => element.isSameNode( actualParent ) ), 1 ) );
                    if( targetParents.length == count ) break parentsLoop }
                actualParent = actualParent.parentElement; range-- }
            return count == 1 ? targetParents.pop() : targetParents },
        enumerable: true },
    oChangeClassesBySize: // Alterna as classes do alvo em função do tamanho de tela
      { value: function oChangeClassesBySize( media, classes, evaluedNode )
          { for( let operator in classes )
              { let classesArray = Array.oMake( classes[ operator ] );
                switch( operator )
                  { case "add": for( let _class of classesArray ) this.classList.toggle( _class, this.oChangeBySize( media, false, false, evaluedNode ) ); break;
                    case "remove": for( let _class of classesArray ) this.classList.toggle( _class, !this.oChangeBySize( media, false, false, evaluedNode ) ); break;
                    default: throw new RangeError( "Object key in argument 'classes' must be 'add' or 'remove'." ) } } },
        enumerable: true },
    oDisableEventType: // Desabilita evento se condição retornar valor verdadeiro
      { value: function oDisableEventType( event, parent = this.parentElement.tagName, condition = true )
          { oAssertType( { string: [ event, parent ] } );
            if( !condition ) return false;
            let target = this.parentElement.closest( parent );
            target.addEventListener( event, oBlockEvent, true );
            return true },
        enumerable: true },
    oFindDepth: // Retorna um número correspondente à profundidade do alvo na árvore do DOM
      { value: function oFindDepth( baseElement = document.documentElement, depth = 0 )
          { oAssertConstructor( { Element: baseElement } );
            if( !baseElement.contains( this ) ) return false;
            if( baseElement.isSameNode( this ) ) return depth;
            let elementChildren = baseElement.children;
            for( let child of elementChildren )
              { if( child.contains( this ) ) return this.oFindDepth( child, ++depth ) } },
        enumerable: true },
    oRenableEventType: // Reabilita evento se condição retornar valor verdadeiro
      { value: function oRenableEventType( event, parent = this.parentElement.tagName, condition = true )
          { oAssertType( { string: [ event, parent ] } );
            if( !condition ) return false;
            let target = this.parentElement.closest( parent );
            target.removeEventListener( event, oBlockEvent, true );
            return true },
        enumerable: true },
    oRestrictClass: // Dentro de dado grupo, restringe uma classe de modo que apenas o alvo a tenha
      { value: function oRestrictClass( _class, elementsGroup = this.parentElement.children, reset = false )
          { oAssertType( { string: _class } );
            let groupList = new oElementsArray( elementsGroup );
            if( !reset && this.classList.contains( _class ) ) return;
            for( let element of elementsGroup ) element.classList.remove( _class );
            this.classList.add( _class ) },
        enumerable: true },
    oTriggerMediaLoading: // Habilita a possibilidade de carregamento de dado recurso midiático
      { value: function oTriggerMediaLoading()
          { switch( this.tagName )
              { case "PICTURE": for( let image of this.children ) checkDataset( image ); break;
                case "SOURCE":
                case "IMG": checkDataset( this ); break;
                case "VIDEO":
                case "AUDIO": checkDataset( this );
                  for( let source of this.children ) checkDataset( source ); break;
                default: throw new RangeError( "The target of oTriggerMediaLoading must be a <picture>, <source>, <img>, <video> or <audio> element." ) }
            function checkDataset( element )
              { let source, attribute;
                if( ( ( source = element.dataset.src ) && ( attribute = "data-src" ) ) || ( ( source = element.dataset.srcset ) && ( attribute = "data-srcset" ) ) )
                  { element.setAttribute( attribute.replace( "data-", "" ), source );
                    element.removeAttribute( attribute ) } } },
        enumerable: true } } );

/*---- Elementos do HTML ----*/

// Elementos do HTML – Protótipo

Object.defineProperties( HTMLElement.prototype,
  { oCatchClicksWithKeys: // Aciona eventos de clique através do teclado
      { value: function oCatchClicksWithKeys( event, keys = [ "Enter" ] )
          { oAssertType( { string: keys } );
            if( keys.some( key => event.key == key ) ) return this.click() },
        enumerable: true },
    oChangeText: // Altera texto do alvo, armazenando o original em uma propriedade
      { value: function oChangeText( textSource, textType = "textContent", update = false )
          { if( this[ textType ] == textSource ) return false;
            oAssert( [ "textContent", "innerText", "innerHTML" ].includes( textType ), `${ textType } is not a valid key for 'oChangeText'`, RangeError );
            oAssertType( { string: textSource } );
            if( !this[ 'oFormerText' ] || update ) this.oFormerText = this[ textType ];
            this[ textType ] = textSource;
            return true },
        enumerable: true },
    oConstraintSize: // Limita medidas do alvo às de dado elemento
      { value: function oConstraintSize( element, sizeMap = { width: true, height: true } )
          { let sizeArgument = {};
            if( sizeMap[ width ] ) sizeArgument[ "maxWidth" ] = "offsetWidth";
            if( sizeMap[ height ] ) sizeArgument[ "maxHeight" ] = "offsetHeight";
            return this.oMatchSize( element, sizeArgument, 1 ) },
        enumerable: true },
    oControlAnimation: // Controla o início e fim de animações
      { value: function oControlAnimation()
          { return this.style.animationPlayState = window.getComputedStyle( this ).animationPlayState == "paused" ? "running" : "paused" },
        enumerable: true },
    oEncompassChildren: // Expande medidas do alvo até que alcance a total de seus descendentes
      { value: function oEncompassChildren( sizeMap = { width: true, height: true } )
          { for( let size in sizeMap ) this.style[ size ] = this.oGetElementSize( size ) + "px";
            return true },
        enumerable: true },
    oFlatSize: // Equaliza medidas do alvo às de dado elemento
      { value: function oFlatSize( element, sizeMap = { width: true, height: true } )
          { let sizeArgument = {};
            if( sizeMap[ width ] ) sizeArgument[ "width" ] = "offsetWidth";
            if( sizeMap[ height ] ) sizeArgument[ "height" ] = "offsetHeight";
            return this.oMatchSize( element, sizeArgument, 1 ) },
        enumerable: true },
    oGetElementSize: // Retorna medidas do elemento
      { value: function oGetElementSize( cssSize, propertySize, element = this )
          { let boxType = window.getComputedStyle( this ).boxSizing,
                scrollSize = "scroll" + ( cssSize.charAt( 0 ).toUpperCase() + cssSize.slice( 1 ) ),
                offsetSize = "offset" + ( cssSize.charAt( 0 ).toUpperCase() + cssSize.slice( 1 ) );
            return boxType == "border-box" ?
              element[ propertySize || scrollSize ] :
              element[ propertySize || scrollSize ] - ( element[ offsetSize ] - window.getComputedStyle( element )[ cssSize ].oFilterNumber() ) },
        enumerable: true },
    oMatchSize: // Redimensiona alvo em relação a dado elemento
        { value: function oMatchSize( element, sizeMap = { width: "scrollWidth", height: "scrollHeight" }, multiplier = 1 )
            { oAssertType( { number: multiplier } );
              oAssertConstructor( { HTMLElement: element } );
              let allowedKeys = [ "minWidth", "minHeight", "width", "height", "maxWidth", "maxHeight" ],
                  allowedValues = [ "clientWidth", "clientHeight", "offsetWidth", "offsetHeight", "scrollWidth", "scrollHeight" ];
              for( let size in sizeMap )
                { oAssert( allowedKeys.includes( size ) && allowedValues.includes( sizeMap[ size ] ), "Wrong data passed to argument 'sizeMap'.", RangeError );
                  this.style[ size ] = this.oGetElementSize( size, sizeMap[ size ], element ) * multiplier + "px" } },
          enumerable: true } } );

/*---- Elemento DL ----*/

// Elemento DL – Protótipo

Object.defineProperties( HTMLDListElement.prototype,
  { oGetDescriptions: // Retorna os DD descendentes diretos da DL
      { value: function oGetDescriptions()
          { return Array.from( this.children ).filter( element => element.tagName == "DD" ) },
        enumerable: true },
    oGetEntries: // Retorna um mapa cujas chaves são os DT diretos da DL, e os valores são arranjos de seus respectivos DD
      { value: function oGetEntries()
          { let dt = this.oGetTerms(), dlEntries = [];
            for( let i = 0; i < dt.length; i++ )
              { dlEntries.push( Array.of( dt[i] ) );
                let targetElement = dlEntries[i][0].nextElementSibling;
                while( targetElement && targetElement.tagName != "DT" )
                  { if( targetElement.tagName == "DD" ) dlEntries[i].push( targetElement );
                    targetElement = targetElement.nextElementSibling } };
            return descriptionMap },
        enumerable: true },
    oGetTerms: // Retorna os DT descendentes diretos da DL
      { value: function oGetTerms()
          { return Array.from( this.children ).filter( element => element.tagName == "DT" ) },
        enumerable: true } } );

/*---- Construtores & Pseudoconstrutores ----*/

// Arranjos de Elementos – Construtor

export const oElementsArray = function( elements )
  { let baseArray = Array.oMake( elements );
    oAssertConstructor( { Element: elements } );
    oElementsArray.setProperties( baseArray );
    return baseArray }

Object.defineProperties( oElementsArray,
  { setProperties:
      { value: function setProperties( baseArray )
          { let targetMethods = Object.keys( oElementsArray.prototype );
            for( let method of targetMethods ) baseArray[ method ] = oElementsArray.prototype[ method ];
            return baseArray },
        enumerable: true } } )

// Arranjos de Elementos – Protótipo

Object.defineProperties( oElementsArray.prototype,
  { oSelectForEach: // Itera o alvo e retorna um arranjo com elementos que corresponderem à string de seleção do argumento
      { value: function oSelectForEach( selector, target = "children", count = 1, range = Infinity )
          { oAssertType( { string: selector, number: [ count, range ] } );
            oAssert( count > 0 && range > 0, "The arguments 'count' and 'range' must be greater than 0.", RangeError );
            let selection = [], method;
            switch( target )
              { case "children": method = "oBringChildren"; break;
                case "parents": method = "oBringParentsChain"; break;
                default: throw new RangeError( "The allowed values for argument 'target' are 'children' and 'parents'." ) };
            switch( method )
              { case "oBringChildren": this.forEach( element =>
                  { selection = selection.concat( element.oBringChildren( element.querySelectorAll( selector ), count, range ) || [] ) } ); break;
                case "oBringParentsChain": this.forEach( element =>
                  { let parents = element.oBringParentsChain().slice( 0, range ), matchesCount = 0;
                    for( let parent of parents )
                      { if( parent.matches( selector ) )
                          { selection.push( parent ); matchesCount++;
                            if( matchesCount == count ) break } } } ) }
            return selection },
        enumerable: true } } );
