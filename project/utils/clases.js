
export class Shedule{
    
    constructor( props = { mo: [], tu: [], we: [], th: [], fr: [], st: [], su: [], duration: {} }, user){
        this.mo = props.mo
        this.tu = props.tu
        this.we = props.we
        this.th = props.th
        this.fr = props.fr
        this.st = props.st
        this.su = props.su
        this.duration = props.duration
        this.redDays = {}
        this.reInit( user )
    }
    days(){ return [
        'mo', 'tu', 'we', 'th', 'fr', 'st', 'su'
    ]}

    addLesson( day, lesson, index = null ){
        if( this[day] == null ){
            lesson.index = 1
            this[day] = [ {...lesson} ]
        }
        else{
            if( index == null ){
                this[day].push( lesson )
                lesson.index = this[day].length
            }
            else{
                lesson.index = index
                this[day][index-1] = lesson
            }
        }
    }

    getDayByIndex( index ){
        return(this[Object.keys(this)[index]])
    }

    reInit( user ){
        
        for( let d = 0; d < 7; d++  ){
            let day = this[this.days()[d]]
            
            for(let l in day ){
                let lesson = day[l]
                let subject = lesson.subject
                let cl = lesson.class
                if( d == 0 && l == 0 ) user.clases[cl].subjects[subject].countWeek = 0
                user.clases[cl].subjects[subject].countWeek += 1
            }
        }
    }

    checkRedDays(){
        if( !this.redDays ){
            this.redDays = {}
        }
        for( let time in this.duration.result ){
            let start = this.duration.result[time][0]
            let end = this.duration.result[time][1]
            let test = 0
            while( start < end ){
                let day = start.getDay() - 1
                let lessons = this[this.days()[day]]
                for( let l in lessons ){
                    let lesson = lessons[l]
                    let cl = lesson.class
                    let subject = lesson.subject
                    let countWeek = cl.subjects[subject].countWeek
                    let theme = lesson.theme
                        
                    if( countWeek > 1 && theme.type == 200 && ( lesson.index == 1 || lesson.index == lessons.length || day == 0 || day == 6 || theme.index % countWeek == 0 || theme.index % countWeek == 1 ) ){
                        let temp_date = start.toJSON().substring(0, 10)
                        if( !this.redDays[cl.name] ){
                            this.redDays[cl.name] = {}
                        }
                        else{
                            this.redDays[cl.name][temp_date] = lesson
                        }
                        
                    }
                    else if( countWeek <= 1 && theme.type == 200 && ( true ) ){
                
                    }
                }
                

                start.setDate( start.getDate() + 1 )
                
            }
            return this.redDays
        }

    }
}
export const datePopr = 3600*24*1000
export class Duration{
    constructor( start, end, spaces = [] ){
        this.start = start
        this.end = end
        this.result = []
        for ( let i = 0; i < spaces.length; i ++ ){
            let space_start = spaces[i][0], space_end =  spaces[i][1]
            if( ( start <= space_start <= end ) && ( start <= space_end <= end ) ){
                this.result.push([start, space_start])
                start = space_end
            }
        }
        this.result.push( [start, end] )
    }
}
export class Class{
    constructor( name = "Новый класс", subs = {} ){
        this.id = -1;
        this.name = name;
        this.subjects = subs
        Object.keys(this.subjects).forEach(element =>{
            this.subjects[element].countWeek = 0
        })
    }
}
export class Theme{
    constructor( name = "Новая тема", type ){
        this.id = -1
        this.name = name
        this.type = type
        this.index = -1
    }
}
export class Lesson{
    constructor( props = { class: String, subject: String, theme: Object } ){
        this.index = -1
        this.class = props.class
        this.subject = props.subject
        this.theme = props.theme
    }
}
