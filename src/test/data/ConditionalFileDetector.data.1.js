if(true) { // Standard without space
  return 0;
}

if (true) { // Standard with space
  return 0;
} else if(false) { // else-if without space
  return 0;
} else if (false) { // else-if with space
  return 0;
}

		if (true) { // indented with tabs
			return 0;
		}

// ALL BELOW SHOULD NOT BE MATCHED

function aif(){ // function containing 'if' without space
  return 0;
}

function bif() { // function containing 'if' with space
  return 0;
}

// if (true) { // Commented out
//   return 0;
// } else if (false) {
//   return 0;
// }

/* if (true) { // Commented out - multi-line
  return 0;
} else if (false) {
  return 0;
} */