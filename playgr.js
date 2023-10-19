const {ref, computed, reactive, toRef, toRefs} = require("vue")
// ref - returns reactive object, use: to set up the thing that will be track
let a = ref(1)
let b = ref(2)

//computed return reactive object
//c is reactive object from view
let c = computed(() => a.value + b.value)
console.log(c.value);

//reactive is only for objects,use: we can get the values directly with person.firstName, instead person.firstName.value
const person = reactive({
    firstName: "Reni",
    lastName: "Ilcheva"
})

const title = computed(() => {
    `${person.firstName} ${person.lastName}`
})

//toRef - returns reactive object. use: when want to reference props and make them reactive
const firstName = toRef(person, "firstName")

//toRefs -it is only for reactive objects, returns reactive object where every single key is another reactive object. use: for reactive objects destructoring 
const {firstName, lastName} = toRefs(person)